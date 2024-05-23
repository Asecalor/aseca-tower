export class CreateProductDTO {
    name: string;

    constructor(product: CreateProductDTO) {
        this.name = product.name;
    }
}