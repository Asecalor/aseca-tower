// src/client/client.module.ts
import { Module } from '@nestjs/common';
import { ClientService } from './service/client.service';
import { ClientController } from './controller/client.controller';
import { IClientRepository } from './repository/client.repository.interface';
import { ClientRepository } from './repository/client.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { IClientService } from './service/client.service.interface';

export const clientRepositoryProvider = {
  provide: IClientRepository,
  useClass: ClientRepository,
};

export const clientServiceProvider = {
  provide: IClientService,
  useClass: ClientService,
};

@Module({
  imports: [PrismaModule],
  controllers: [ClientController],
  providers: [clientServiceProvider, clientRepositoryProvider],
})
export class ClientModule { }
