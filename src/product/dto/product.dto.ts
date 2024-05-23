import { CreateProductDTO } from "./create-product.dto";

export class ProductDTO extends CreateProductDTO {
    id: number;

    constructor(product: ProductDTO) {
        super(product);
        this.id = product.id;
    }

}