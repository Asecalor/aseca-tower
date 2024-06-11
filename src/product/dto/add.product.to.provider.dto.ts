import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddProductToProviderDTO {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly productId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly price: number;
}