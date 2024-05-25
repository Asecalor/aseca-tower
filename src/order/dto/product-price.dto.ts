import { ApiProperty } from "@nestjs/swagger";
import { ProductOrderDTO } from "./product-order.dto";

export class CompleteProductDTO extends ProductOrderDTO {
  @ApiProperty()
  readonly price: number;

  constructor(product: CompleteProductDTO) {
    super(product);
    this.price = product.price;
  }
}
