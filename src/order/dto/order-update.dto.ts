import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrderUpdateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  status: string;
}
