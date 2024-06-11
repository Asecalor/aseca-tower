import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IProviderService } from "./provider.service.interface";
import { ProviderDTO } from "../dto/provider.dto";
import { Provider } from "../input/provider.input";
import { IProviderRepository } from "../repository/provider.repository.interface";
import { IProductRepository } from '../../product/repository/product.repository.interface';
import { AddProductToProviderDTO } from '../../product/dto/add.product.to.provider.dto';

@Injectable()
export class ProviderService implements IProviderService {

    constructor(@Inject(IProviderRepository) private readonly providerRepository: IProviderRepository,
                @Inject(IProductRepository) private readonly productRepository: IProductRepository
    ) { }

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

    async assignProviderToProduct(providerId: number, product: AddProductToProviderDTO): Promise<void> {
        const provider= await this.providerRepository.findById(providerId);
        if (!provider) {
            throw new NotFoundException('Provider not found');
        }
        const productFound= await this.productRepository.findById(product.productId);
        if (!productFound) {
            throw new NotFoundException('Product not found');
        }
        return await this.providerRepository.assignProviderToProduct(providerId, product);
    }
}