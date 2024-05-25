import { ProductDTO } from "../dto";
import { CreateProduct } from "../input/product.input";

export abstract class IProductRepository {
    abstract create(product: CreateProduct): Promise<ProductDTO>;
    // abstract update(id: number, product: CreateProductDTO): Promise<ProductDTO>;
    abstract delete(id: number): Promise<void>;
    abstract findAll(): Promise<ProductDTO[]>;
    abstract findById(id: number): Promise<ProductDTO>;
    abstract findByName(name: string): Promise<ProductDTO>;
}