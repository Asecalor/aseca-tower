import { ClientDTO } from "../dto/client.dto";
import { CreateClient } from "../input/client.input";

export abstract class IClientRepository {
  abstract findByEmail(clientEmail: string): Promise<ClientDTO | null>
  abstract getClientAddress(clientId: number): Promise<string | null>;
  abstract create(createClientDto: CreateClient): Promise<ClientDTO>;
  abstract findAll(): Promise<ClientDTO[]>;
  abstract findById(cleintId: number): Promise<ClientDTO | null>;
}