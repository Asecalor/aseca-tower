
import { ConflictException, Injectable } from '@nestjs/common';
import { IClientRepository } from '../repository/client.repository.interface';
import { CreateClientDto } from '../dto/create-client.dto';
import { Client } from '../model/client-model';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: IClientRepository) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const existingClient = await this.clientRepository.findByEmail(createClientDto.email);
    if (existingClient) {
      throw new ConflictException('A client with this email already exists');
    }
    return this.clientRepository.create(createClientDto);
  }


  async getClientById(id: number) {
    return this.clientRepository.getClientById(id)
  }

}
