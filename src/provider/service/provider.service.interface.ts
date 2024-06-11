import { ProviderDTO } from "../dto/provider.dto";
import { Provider } from "../input/provider.input";
import { AddProductToProviderDTO } from '../../product/dto/add.product.to.provider.dto';

export abstract class IProviderService {
    abstract createProvider(provider: Provider): Promise<ProviderDTO>;
    abstract deleteProvider(id: number): Promise<void>;
    abstract findAllProviders(): Promise<ProviderDTO[]>;
    abstract findProviderById(id: number): Promise<ProviderDTO>;
    abstract assignProviderToProduct(providerId: number,product: AddProductToProviderDTO): Promise<void>;
} 