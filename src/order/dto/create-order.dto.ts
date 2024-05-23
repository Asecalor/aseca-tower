import { IsNotEmpty, IsNumber } from 'class-validator';
import { ProductOrderDto } from './product-order.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  clientId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  providerId: number;

  @IsNotEmpty()
  @ApiProperty({ type: [ProductOrderDto] })
  products: ProductOrderDto[];
}
