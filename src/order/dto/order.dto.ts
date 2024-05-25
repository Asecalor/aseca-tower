import { ApiProperty } from "@nestjs/swagger";

export class OrderDTO {
    @ApiProperty()
    readonly id: number;
    @ApiProperty()
    readonly clientId: number;
    @ApiProperty()
    readonly providerId: number;
    @ApiProperty()
    readonly totalAmount: number;
    @ApiProperty()
    readonly status: string;
    @ApiProperty()
    readonly adress?: string;

    constructor(order: OrderDTO) {
        this.id = order.id;
        this.providerId = order.providerId;
        this.clientId = order.clientId;
        this.totalAmount = order.totalAmount;
        this.status = order.status;
        this.adress = order.adress;
    }
}