import { IOrderService } from './order.service.interface';
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IOrderRepository } from '../repository/order.repository.interface';
import { IClientRepository } from '../../client/repository/client.repository.interface';
import { statusTransitions } from '../util/util';
import { OrderStatus } from '../model/order-status';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CompleteOrderDTO, OrderDTO } from '../dto';
import { CreateOrder } from '../input';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
    @Inject(IClientRepository)
    private readonly clientRepository: IClientRepository,
    private readonly httpService: HttpService,
  ) { }

  async createOrder(order: CreateOrder): Promise<CompleteOrderDTO> {
    const clientAddress = await this.clientRepository.getClientAddress(
      order.clientId,
    );
    if (!clientAddress) {
      throw new NotFoundException('Client not found');
    }

    const orderCreated = await this.orderRepository.create(order);
    if (!orderCreated) {
      throw new ConflictException(
        'Some of products where not found or it not belongs to the provider',
      );
    }
    const orderWithAdress = new CompleteOrderDTO({ ...orderCreated, address: clientAddress });
    await firstValueFrom(
      this.httpService
        .post('http://wms-api:3001/warehouse/order', orderWithAdress)
        .pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 409) {
              this.orderRepository.update(
                orderCreated.id,
                OrderStatus.REJECTED,
              );
              throw new ConflictException('Insufficient stock');
            }
            return Promise.resolve();
          }),
        ),
    );
    return orderWithAdress;
  }

  async getOrders(clientId?: number): Promise<OrderDTO[]> {
    if (clientId) {
      return await this.orderRepository.findByClientId(clientId);
    }
    return await this.orderRepository.findAll();
  }

  async updateOrderStatus(orderId: number, nextStatus: OrderStatus): Promise<any> {
    const currentStatus = await this.orderRepository.getStatus(orderId);
    if (!currentStatus) {
      throw new NotFoundException('Order not found'); //Pendientes, rechazadas ,aceptadas,entregadas, reviewed
    }
    if (!nextStatus) {
      throw new ConflictException('Invalid status');
    }
    const currentStatusEnum = OrderStatus[currentStatus];
    const allowedTransitions = statusTransitions.get(currentStatusEnum);

    if (
      !allowedTransitions ||
      !allowedTransitions.includes(nextStatus)
    ) {
      throw new ConflictException('Invalid status transition');
    }
    if (
      currentStatusEnum === OrderStatus.PENDING &&
      nextStatus === OrderStatus.ACCEPTED
    ) {
      await this.orderRepository.update(orderId, OrderStatus.ACCEPTED);
      await this.orderRepository.createLog(orderId);
    } else {
      await this.orderRepository.update(orderId, nextStatus);
    }
  }

  async findOrderById(orderId: number): Promise<CompleteOrderDTO | null> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  // //Cron task to handle pending orders every 30 seconds
  @Cron(CronExpression.EVERY_30_SECONDS)
  private async handlePendingOrders() {
    const pendingOrders = await this.orderRepository.findByStatus(OrderStatus.PENDING);
    for (const order of pendingOrders) {
      const clientAddress = await this.clientRepository.getClientAddress(
        order.clientId,
      );
      const orderData = new CompleteOrderDTO({
        ...order, address: clientAddress, products: await this.orderRepository.getProductOrdersByOrderId(order.id),
      });
      await firstValueFrom(
        this.httpService
          .post('http://wms-api:3001/warehouse/order', orderData)
          .pipe(
            catchError((error: AxiosError) => {
              if (error.response?.status === 409) {
                this.orderRepository.update(order.id, OrderStatus.REJECTED);
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
