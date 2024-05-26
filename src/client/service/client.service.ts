
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IClientRepository } from '../repository/client.repository.interface';
import { CreateClient } from '../input/client.input';
import { ClientDTO } from '../dto/client.dto';
import { IClientService } from './client.service.interface';

@Injectable()
export class ClientService implements IClientService {
  constructor(@Inject(IClientRepository) private readonly clientRepository: IClientRepository) { }

  async createClient(createClientDto: CreateClient): Promise<ClientDTO> {
    const existingClient = await this.clientRepository.findByEmail(createClientDto.email);
    if (existingClient) {
      throw new ConflictException('A client with this email already exists');
    }
    return this.clientRepository.create(createClientDto);
  }

  async findAllClients(): Promise<ClientDTO[]> {
    return this.clientRepository.findAll()
  }


  async findClientById(id: number): Promise<ClientDTO | null> {
    return this.clientRepository.findById(id)
  }

}
