import { ApiProperty } from '@nestjs/swagger';
import { ProductOrderDto } from './product-order.dto';

export class OrderResponseDto {
  @ApiProperty()
  readonly orderId: number;

  @ApiProperty()
  readonly providerId: number;

  @ApiProperty()
  readonly clientAddress: string;

  @ApiProperty()
  readonly totalAmount: number;

  @ApiProperty({type: [ProductOrderDto]})
  readonly productOrders: ProductOrderDto[];

  constructor(
    orderId: number,
    providerId: number,
    clientAddress: string,
    totalAmount: number,
    productOrders: ProductOrderDto[],
  ) {
    this.orderId = orderId;
    this.providerId = providerId;
    this.clientAddress = clientAddress;
    this.totalAmount = totalAmount;
    this.productOrders = productOrders;
  }
}
