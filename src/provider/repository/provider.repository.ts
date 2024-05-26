import { Inject, Injectable } from "@nestjs/common";
import { IProviderRepository } from "./provider.repository.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { ProviderDTO } from "../dto/provider.dto";
import { Provider } from "../input/provider.input";

@Injectable()
export class ProviderRepository implements IProviderRepository {
    constructor(@Inject(PrismaService) private readonly db: PrismaService) { }

    async create(provider: Provider): Promise<ProviderDTO> {
        return await this.db.provider.create({
            data: {
                name: provider.name,
                email: provider.email,
                lastName: provider.lastName
            }
        });
    }

    async findAll(): Promise<ProviderDTO[]> {
        return await this.db.provider.findMany();
    }

    async findById(id: number): Promise<ProviderDTO> {
        return await this.db.provider.findUnique({
            where: {
                id
            }
        });
    }

    async findByEmail(email: string): Promise<ProviderDTO> {
        return await this.db.provider.findUnique({
            where: {
                email
            }
        });
    }
}