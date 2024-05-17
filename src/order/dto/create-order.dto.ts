import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto{
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number

  @IsNotEmpty()
  @IsNumber()
  readonly providerId: number

  @IsNotEmpty()
  @IsNumber()
  readonly productId: number
}