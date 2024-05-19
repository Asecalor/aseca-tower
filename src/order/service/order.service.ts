import { IOrderService } from './order.service.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IOrderRepository } from '../repository/order.repository.interface';
import { IClientRepository } from '../../client/repository/client.repository.interface';
import { OrderWithAddressDto } from '../dto/order-with-address.dto';
import { OrderResponseDto } from '../dto/order-reponse.dto';
import { OrderUpdateDto } from '../dto/order-update.dto';
import { statusTransitions } from '../util/util';
import { OrderStatus } from '../model/order-status';
import { Order } from '../model/order-model';
import { GetOrderDto } from '../dto/get-order.dto';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
    @Inject(IClientRepository)
    private readonly clientRepository: IClientRepository,
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
    const order= await this.orderRepository.getOrderWithProductsById(orderId)
    if (!order){
      throw new NotFoundException('Order not found')
    }
    return order
  }


}
