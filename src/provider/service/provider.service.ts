import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IProviderService } from "./provider.service.interface";
import { ProviderDTO } from "../dto/provider.dto";
import { Provider } from "../input/provider.input";
import { IProviderRepository } from "../repository/provider.repository.interface";

@Injectable()
export class ProviderService implements IProviderService {

    constructor(@Inject(IProviderRepository) private readonly providerRepository: IProviderRepository) { }

    async createProvider(provider: Provider): Promise<ProviderDTO> {
        const existingProvider = await this.providerRepository.findByEmail(provider.email)
        console.log(existingProvider)
        if (existingProvider) {
            throw new ConflictException('Provider already exists');
        }
        return await this.providerRepository.create(provider);
    }

    async findAllProviders(): Promise<ProviderDTO[]> {
        return await this.providerRepository.findAll();
    }

    async findProviderById(id: number): Promise<ProviderDTO> {
        const provider = await this.providerRepository.findById(id);
        if (!provider) {
            throw new NotFoundException('Provider not found');
        }
        return provider;
    }
}