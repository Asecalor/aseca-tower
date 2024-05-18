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
}
