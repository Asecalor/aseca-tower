import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductOrderDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
