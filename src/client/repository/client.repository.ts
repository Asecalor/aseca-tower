import { IClientRepository } from './client.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(@Inject(PrismaService) private readonly db: PrismaService) {}

  async getClientAddress(clientId: number): Promise<string | null> {
    const client = await this.db.client.findUnique({
      where: {
        id: clientId,
      },
    });
    return client?.address || null;
  }
}
