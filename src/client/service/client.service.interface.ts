import { ClientDTO } from "../dto/client.dto";
import { CreateClient } from "../input/client.input";

export abstract class IClientService {
  abstract createClient(client: CreateClient): Promise<ClientDTO>;
  abstract findAllClients(): Promise<ClientDTO[]>;
  abstract findClientById(id: number): Promise<ClientDTO>;
} 