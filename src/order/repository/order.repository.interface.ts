import { CompleteOrderDTO, OrderDTO, ProductOrderDTO } from '../dto';
import { CreateOrder } from '../input';
import { OrderStatus } from '../model';

export abstract class IOrderRepository {
  abstract create(order: CreateOrder): Promise<CompleteOrderDTO | null>;

  abstract update(orderId: number, status: OrderStatus): Promise<void>;

  abstract delete(orderId: number): Promise<void>;

  abstract findAll(): Promise<OrderDTO[]>;

  abstract findById(orderId: number): Promise<CompleteOrderDTO | null>;

  abstract findByClientId(clientId: number): Promise<OrderDTO[]>;

  abstract findByStatus(status: OrderStatus): Promise<OrderDTO[]>;

  abstract getStatus(orderId: number): Promise<string | null>;

  abstract createLog(orderId: number): Promise<void>;

  abstract getProductOrdersByOrderId(orderId: number): Promise<ProductOrderDTO[]>;
}
