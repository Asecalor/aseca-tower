import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { ProductOrder } from "./product.input";

export class CreateOrder {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    clientId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    providerId: number;

    @IsNotEmpty()
    @ApiProperty({ type: [ProductOrder] })
    products: ProductOrder[];
}
