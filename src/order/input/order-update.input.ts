import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { OrderStatus } from "../model";
import { ApiProperty } from "@nestjs/swagger";

export class OrderUpdate {
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    @ApiProperty()
    status: OrderStatus;
}