import { ApiProperty } from "@nestjs/swagger";
import { OrderDTO } from "./order.dto";
import { ProductOrderDTO } from "./product-order.dto";

export class CompleteOrderDTO extends OrderDTO {
    @ApiProperty({ type: [ProductOrderDTO] })
    readonly products: ProductOrderDTO[];

    constructor(order: CompleteOrderDTO) {
        super(order);
        this.products = order.products;
    }
}