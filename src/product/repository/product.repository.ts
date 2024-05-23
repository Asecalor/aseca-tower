import { Inject, Injectable } from "@nestjs/common";
import { IProductRepository } from "./product.repository.interface";
import { CreateProductDTO, ProductDTO } from "../dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductRepository implements IProductRepository {

    constructor(@Inject(PrismaService) private readonly db: PrismaService) { }

    async create(product: CreateProductDTO): Promise<ProductDTO> {
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
}