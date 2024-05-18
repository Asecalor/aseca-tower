import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderResponseDto } from '../dto/order-reponse.dto';
import { OrderUpdateDto } from '../dto/order-update.dto';

export abstract class IOrderService {
  abstract createOrder(order: CreateOrderDto): Promise<OrderResponseDto>;
  abstract updateOrderStatus(orderId: number, orderUpdate: OrderUpdateDto): any;
}
