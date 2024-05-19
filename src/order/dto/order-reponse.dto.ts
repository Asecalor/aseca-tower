import { ProductOrderDto } from './product-order.dto';

export class OrderResponseDto {
  readonly orderId: number;
  readonly providerId: number;
  readonly clientAddress: string;
  readonly totalAmount: number;
  readonly productOrders: ProductOrderDto[];


  constructor(orderId: number, providerId: number, clientAddress: string, totalAmount: number, productOrders: ProductOrderDto[]) {
    this.orderId = orderId;
    this.providerId = providerId;
    this.clientAddress = clientAddress;
    this.totalAmount = totalAmount;
    this.productOrders = productOrders;
  }
}
