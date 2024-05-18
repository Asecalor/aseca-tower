import { ProductOrderDto } from './product-order.dto';

export class OrderResponseDto {
  readonly orderId: number;
  readonly providerId: number;
  readonly clientAddress: string;
  readonly productOrders: ProductOrderDto[];

  constructor(
    orderId: number,
    providerId: number,
    clientAddress: string,
    productOrders: ProductOrderDto[],
  ) {
    this.orderId = orderId;
    this.providerId = providerId;
    this.clientAddress = clientAddress;
    this.productOrders = productOrders;
  }
}
