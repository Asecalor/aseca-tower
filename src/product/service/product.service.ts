import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IProductService } from "./product.service.interface";
import { CreateProductDTO, ProductDTO } from "../dto";
import { IProductRepository } from "../repository/product.repository.interface";

@Injectable()
export class ProductService implements IProductService {

    constructor(@Inject(IProductRepository) private readonly productRepository: IProductRepository) { }

    async createProduct(product: CreateProductDTO): Promise<ProductDTO> {
        const existingProduct = await this.productRepository.findByName(product.name);
        if (existingProduct) {
            throw new ConflictException('A product with this name already exists');
        }
        return this.productRepository.create(product);
    }
    // async update(id: number, product: CreateProductDTO): Promise<ProductDTO>;
    async deleteProduct(id: number): Promise<void> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return this.productRepository.delete(id);
    }

    async findAllProducts(): Promise<ProductDTO[]> {
        return this.productRepository.findAll();
    }

    async findProductById(id: number): Promise<ProductDTO> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }
}