import { ProviderDTO } from "../dto/provider.dto";
import { Provider } from "../input/provider.input";

export abstract class IProviderRepository {
    abstract create(provider: Provider): Promise<ProviderDTO>;
    abstract findAll(): Promise<ProviderDTO[]>;
    abstract findById(id: number): Promise<ProviderDTO>;
    abstract findByEmail(email: string): Promise<ProviderDTO>;
}