import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderResponseDto } from '../dto/order-reponse.dto';

export abstract class IOrderService {
  abstract createOrder(order: CreateOrderDto): Promise<OrderResponseDto>;
}
