import { OrderResponseDto } from '../dto/order-reponse.dto';
import { OrderWithAddressDto } from '../dto/order-with-address.dto';

export abstract class IOrderRepository {
  abstract createOrder(
    order: OrderWithAddressDto,
  ): Promise<OrderResponseDto | null>;

  abstract getOrderStatus(orderId: number): Promise<string | null>;

  abstract updateOrderStatus(orderId: number, status: string): Promise<void>;

  abstract updatePendingToAccepted(orderId: number): Promise<void>;
}
