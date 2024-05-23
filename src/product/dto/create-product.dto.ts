import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDTO {
    @ApiProperty()
    name: string;

    constructor(product: CreateProductDTO) {
        this.name = product.name;
    }
}