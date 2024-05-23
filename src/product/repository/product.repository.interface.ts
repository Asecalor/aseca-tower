import { CreateProductDTO, ProductDTO } from "../dto";

export abstract class IProductRepository {
    abstract create(product: CreateProductDTO): Promise<ProductDTO>;
    // abstract update(id: number, product: CreateProductDTO): Promise<ProductDTO>;
    abstract delete(id: number): Promise<void>;
    abstract findAll(): Promise<ProductDTO[]>;
    abstract findById(id: number): Promise<ProductDTO>;
    abstract findByName(name: string): Promise<ProductDTO>;
}