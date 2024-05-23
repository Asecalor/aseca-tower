import { CreateProductDTO, ProductDTO } from "../dto";

export abstract class IProductService {
    abstract createProduct(product: CreateProductDTO): Promise<ProductDTO>;
    // abstract update(id: number, product: CreateProductDTO): Promise<ProductDTO>;
    abstract deleteProduct(id: number): Promise<void>;
    abstract findAllProducts(): Promise<ProductDTO[]>;
    abstract findProductById(id: number): Promise<ProductDTO>;
}