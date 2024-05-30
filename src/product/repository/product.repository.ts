import { Inject, Injectable } from "@nestjs/common";
import { IProductRepository } from "./product.repository.interface";
import { ProductDTO } from "../dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProduct } from "../input/product.input";
import { ProductProviderDTO } from '../dto/product.provider.dto';

@Injectable()
export class ProductRepository implements IProductRepository {

    constructor(@Inject(PrismaService) private readonly db: PrismaService) { }

    async create(product: CreateProduct): Promise<ProductDTO> {
        const productCreated = await this.db.product.create({
            data: {
                name: product.name,
            }
        });
        return new ProductDTO(productCreated);
    }

    // async update(id: number, product: CreateProductDTO): Promise<ProductDTO> {

    // }

    async delete(id: number): Promise<void> {
        await this.db.product.delete({
            where: {
                id: id
            }
        });
    }

    async findAll(): Promise<ProductDTO[]> {
        const products = await this.db.product.findMany();
        return products.map(product => new ProductDTO(product));
    }

    async findById(id: number): Promise<ProductDTO> {
        const product = await this.db.product.findUnique({
            where: {
                id: id
            }
        });
        return new ProductDTO(product);
    }

    async findByName(name: string): Promise<ProductDTO> {
        // cannot use findUnique because it only allows to search by id
        const product = await this.db.product.findFirst({
            where: {
                name: name
            }
        });
        return new ProductDTO(product);
    }

    async findAllByProvider(): Promise<ProductProviderDTO[]> {
        const productsProviders = await this.db.productProvider.findMany({
            include: {
                product: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                provider: {
                    select: {
                        id: true,
                        name: true,
                        lastName: true
                    }
                }
            }
        });
        return productsProviders.map(({ product, provider }) => ({
            productId: product.id,
            productName: product.name,
            providerId: provider.id,
            providerName: provider.name,
            providerLastName: provider.lastName
        }));
    }


}