
import { ConflictException, Injectable } from '@nestjs/common';
import { IClientRepository } from '../repository/client.repository.interface';
import { CreateClient } from '../input/client.input';
import { ClientDTO } from '../dto/client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: IClientRepository) { }

  async create(createClientDto: CreateClient): Promise<ClientDTO> {
    const existingClient = await this.clientRepository.findByEmail(createClientDto.email);
    if (existingClient) {
      throw new ConflictException('A client with this email already exists');
    }
    return this.clientRepository.create(createClientDto);
  }

  async getClients(): Promise<ClientDTO[]> {
    return this.clientRepository.findAll()
  }


  async getClientById(id: number): Promise<ClientDTO | null> {
    return this.clientRepository.findById(id)
  }

}
