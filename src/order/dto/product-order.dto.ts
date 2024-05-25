import { ApiProperty } from '@nestjs/swagger';

export class ProductOrderDTO {

  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;

  constructor(product: ProductOrderDTO) {
    this.productId = product.productId;
    this.quantity = product.quantity;
  }
}
