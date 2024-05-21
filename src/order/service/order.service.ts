import { IOrderService } from './order.service.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IOrderRepository } from '../repository/order.repository.interface';
import { IClientRepository } from '../../client/repository/client.repository.interface';
import { OrderWithAddressDto } from '../dto/order-with-address.dto';
import { OrderResponseDto } from '../dto/order-reponse.dto';
import { OrderUpdateDto } from '../dto/order-update.dto';
import { statusTransitions } from '../util/util';
import { OrderStatus } from '../model/order-status';
import { GetOrderDto } from '../dto/get-order.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
    @Inject(IClientRepository)
    private readonly clientRepository: IClientRepository,
    private readonly httpService: HttpService,
  ) {}
  async createOrder(order: CreateOrderDto): Promise<OrderResponseDto> {
    const clientAddress = await this.clientRepository.getClientAddress(
      order.clientId,
    );
    if (!clientAddress) {
      throw new NotFoundException('Client not found');
    }
    const orderWithAddress = new OrderWithAddressDto(
      order.clientId,
      order.providerId,
      clientAddress,
      order.products,
    );
    const orderCreated =
      await this.orderRepository.createOrder(orderWithAddress);
    if (!orderCreated) {
      throw new ConflictException(
        'Some of products where not found or it not belongs to the provider',
      );
    }
    //Here we send the order to the warehouse api
    //If user wants to see the order status, should use GET order/{orderId}
    //I use host.docker.internal to point outside the docker container (host) for that request
    await firstValueFrom(
      this.httpService
        .post('http://host.docker.internal:3001/warehouse/order', orderCreated)
        .pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 409) {
              this.orderRepository.updateOrderStatus(
                orderCreated.orderId,
                'REJECTED',
              );
              throw new ConflictException('Insufficient stock');
            }
            throw new InternalServerErrorException(
              'Warehouse Api is not available',
            );
          }),
        ),
    );
    return orderCreated;
  }

  async updateOrderStatus(orderId: number, updateOrder: OrderUpdateDto) {
    const currentStatus = await this.orderRepository.getOrderStatus(orderId);
    if (!currentStatus) {
      throw new NotFoundException('Order not found');
    }
    const requestedStatusEnum = OrderStatus[updateOrder.status];
    if (!requestedStatusEnum) {
      throw new ConflictException('Invalid status');
    }
    const currentStatusEnum = OrderStatus[currentStatus];
    const allowedTransitions = statusTransitions.get(currentStatusEnum);

    if (
      !allowedTransitions ||
      !allowedTransitions.includes(requestedStatusEnum)
    ) {
      throw new ConflictException('Invalid status transition');
    }
    if (
      currentStatusEnum === OrderStatus.PENDING &&
      requestedStatusEnum === OrderStatus.ACCEPTED
    ) {
      await this.orderRepository.updatePendingToAccepted(orderId);
    } else {
      await this.orderRepository.updateOrderStatus(orderId, updateOrder.status);
    }
  }

  async getOrderById(orderId: number): Promise<GetOrderDto | null> {
    const order = await this.orderRepository.getOrderWithProductsById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
  //Cron task to handle pending orders every 30 seconds
  @Cron(CronExpression.EVERY_30_SECONDS)
  private async handlePendingOrders() {
    const pendingOrders = await this.orderRepository.getAllPendingOrders();
    for (const order of pendingOrders) {
      const clientAddress = await this.clientRepository.getClientAddress(
        order.clientId,
      );
      const orderData = new OrderResponseDto(
        order.clientId,
        order.providerId,
        clientAddress,
        order.totalAmount,
        await this.orderRepository.getProductOrdersByOrderId(order.id),
      );
      await firstValueFrom(
        this.httpService
          .post('http://host.docker.internal:3001/warehouse/order', orderData)
          .pipe(
            catchError((error: AxiosError) => {
              if (error.response?.status === 409) {
                this.orderRepository.updateOrderStatus(order.id, 'REJECTED');
                throw new ConflictException('Insufficient stock');
              }
              throw new InternalServerErrorException(
                'Warehouse Api is not available',
              );
            }),
          ),
      );
    }
  }
}
