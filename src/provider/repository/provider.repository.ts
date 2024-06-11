import { Inject, Injectable } from "@nestjs/common";
import { IProviderRepository } from "./provider.repository.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { ProviderDTO } from "../dto/provider.dto";
import { Provider } from "../input/provider.input";
import { AddProductToProviderDTO } from '../../product/dto/add.product.to.provider.dto';

@Injectable()
export class ProviderRepository implements IProviderRepository {
    constructor(@Inject(PrismaService) private readonly db: PrismaService) { }

    async create(provider: Provider): Promise<ProviderDTO> {
        return this.db.provider.create({
            data: {
                name: provider.name,
                email: provider.email,
                lastName: provider.lastName
            }
        });
    }

    async findAll(): Promise<ProviderDTO[]> {
        return this.db.provider.findMany();
    }

    async findById(id: number): Promise<ProviderDTO> {
        return this.db.provider.findUnique({
            where: {
                id
            }
        });
    }

    async findByEmail(email: string): Promise<ProviderDTO> {
        return this.db.provider.findUnique({
            where: {
                email
            }
        });
    }

    async assignProviderToProduct(providerId: number, product: AddProductToProviderDTO): Promise<any> {
        return this.db.productProvider.create({
            data: {
                providerId,
                ...product
            }
        });
    }
}