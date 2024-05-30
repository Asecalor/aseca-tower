import { ProductDTO } from "../dto";
import { CreateProduct } from "../input/product.input";
import { ProductProviderDTO } from '../dto/product.provider.dto';

export abstract class IProductService {
    abstract createProduct(product: CreateProduct): Promise<ProductDTO>;
    // abstract update(id: number, product: CreateProductDTO): Promise<ProductDTO>;
    abstract deleteProduct(id: number): Promise<void>;
    abstract findAllProducts(): Promise<ProductDTO[]>;
    abstract findAllProductsByProvider(): Promise<ProductProviderDTO[]>
    abstract findProductById(id: number): Promise<ProductDTO>;
}