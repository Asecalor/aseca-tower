import { CompleteOrderDTO, OrderDTO } from '../dto';
import { CreateOrder } from '../input';
import { OrderStatus } from '../model';

export abstract class IOrderService {
  abstract createOrder(order: CreateOrder): Promise<CompleteOrderDTO>;
  abstract getOrders(): Promise<OrderDTO[]>;
  abstract updateOrderStatus(orderId: number, nextStatus: OrderStatus): any;
  abstract findOrderById(orderId: number): Promise<CompleteOrderDTO | null>;
}
