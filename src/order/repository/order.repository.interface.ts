import { OrderResponseDto } from '../dto/order-reponse.dto';
import { ProductOrderDto } from '../dto/product-order.dto';
import { ProductPriceDto } from '../dto/product-price.dto';
import { OrderWithAddressDto } from '../dto/order-with-address.dto';

export abstract class IOrderRepository {
  abstract createOrder(
    order: OrderWithAddressDto,
  ): Promise<OrderResponseDto | null>;
}
