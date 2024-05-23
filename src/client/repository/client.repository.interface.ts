import { Client, CreateClientDto } from "../dto";

export abstract class IClientRepository {
  abstract findByEmail(clientEmail: string): Promise<Client | null>
  abstract getClientAddress(clientId: number): Promise<string | null>;
  abstract create(createClientDto: CreateClientDto): Promise<Client>;
  abstract get(): Promise<Client[]>;
  abstract findById(cleintId: number): Promise<Client | null>;
}