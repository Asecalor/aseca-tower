import { ApiProperty } from "@nestjs/swagger";
import { CreateProductDTO } from "./create-product.dto";

export class ProductDTO extends CreateProductDTO {
    @ApiProperty()
    id: number;

    constructor(product: ProductDTO) {
        super(product);
        this.id = product.id;
    }

}