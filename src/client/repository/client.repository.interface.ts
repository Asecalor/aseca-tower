import { CreateClientDto } from "../dto/create-client.dto";
import { Client } from "../model/client-model";

export abstract class IClientRepository {
  abstract findByEmail(clientEmail: string): Promise<Client | null>
  abstract getClientAddress(clientId: number): Promise<string | null>;
  abstract create(createClientDto: CreateClientDto): Promise<Client>;
  abstract getClientById(cleintId: number): Promise<Client | null>;
}