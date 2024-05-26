import { ProviderDTO } from "../dto/provider.dto";
import { Provider } from "../input/provider.input";

export abstract class IProviderService {
    abstract createProvider(provider: Provider): Promise<ProviderDTO>;
    abstract findAllProviders(): Promise<ProviderDTO[]>;
    abstract findProviderById(id: number): Promise<ProviderDTO>;
} 