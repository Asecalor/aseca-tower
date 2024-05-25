import { ProductDTO } from "../dto";
import { CreateProduct } from "../input/product.input";

export abstract class IProductService {
    abstract createProduct(product: CreateProduct): Promise<ProductDTO>;
    // abstract update(id: number, product: CreateProductDTO): Promise<ProductDTO>;
    abstract deleteProduct(id: number): Promise<void>;
    abstract findAllProducts(): Promise<ProductDTO[]>;
    abstract findProductById(id: number): Promise<ProductDTO>;
}