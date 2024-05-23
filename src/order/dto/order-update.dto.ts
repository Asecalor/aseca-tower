import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from '../model';

export class OrderUpdateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus'})
  status: OrderStatus;
}
