import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderResponseDto } from '../dto/order-reponse.dto';
import { OrderUpdateDto } from '../dto/order-update.dto';
import { Order } from '../model/order-model';
import { GetOrderDto } from '../dto/get-order.dto';

export abstract class IOrderService {
  abstract createOrder(order: CreateOrderDto): Promise<OrderResponseDto>;
  abstract updateOrderStatus(orderId: number, orderUpdate: OrderUpdateDto): any;
  abstract getOrderById(orderId:number): Promise<GetOrderDto|null>
}
