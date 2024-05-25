import { ApiProperty } from "@nestjs/swagger";

export class ProductDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;


    constructor(product: ProductDTO) {
        this.name = product.name;
        this.id = product.id;
    }

}