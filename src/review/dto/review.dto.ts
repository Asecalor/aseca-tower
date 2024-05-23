import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class ReviewDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly orderId: number;
  
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(10)
  @ApiProperty()
  readonly rating: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly comment: string;
}
