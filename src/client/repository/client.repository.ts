import { IClientRepository } from './client.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Client, CreateClientDto } from '../dto';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(@Inject(PrismaService) private readonly db: PrismaService) { }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    return this.db.client.create({
      data: createClientDto,
    });
  }

  async findAll(): Promise<Client[]> {
    return this.db.client.findMany();
  }


  async getClientAddress(clientId: number): Promise<string | null> {
    const client = await this.db.client.findUnique({
      where: {
        id: clientId,
      },
    });
    return client?.address || null;
  }

  async findByEmail(email: string): Promise<Client | null> {
    return this.db.client.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(clientId: number): Promise<Client | null> {
    return this.db.client.findUnique({
      where: {
        id: clientId,
      },
    });
  }
}
