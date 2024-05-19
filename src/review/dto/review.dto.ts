import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class ReviewDto{

  @IsNumber()
  @IsNotEmpty()
  readonly orderId: number
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(10)
  readonly rating: number

  @IsNotEmpty()
  @IsString()
  readonly comment: string
}