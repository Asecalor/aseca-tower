import { ProviderDTO } from "../dto/provider.dto";
import { Provider } from "../input/provider.input";
import { AddProductToProviderDTO } from '../../product/dto/add.product.to.provider.dto';

export abstract class IProviderRepository {
    abstract create(provider: Provider): Promise<ProviderDTO>;
    abstract delete(id: number): Promise<void>;
    abstract findAll(): Promise<ProviderDTO[]>;
    abstract findById(id: number): Promise<ProviderDTO>;
    abstract findByEmail(email: string): Promise<ProviderDTO | null>;
    abstract assignProviderToProduct(providerId: number, product: AddProductToProviderDTO): Promise<void>;
}