import { IsNotEmpty, IsNumber } from 'class-validator';
import { ProductOrderDto } from './product-order.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @IsNotEmpty()
  @IsNumber()
  providerId: number;

  @IsNotEmpty()
  products: ProductOrderDto[];
}
