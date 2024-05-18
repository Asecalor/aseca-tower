import { Module } from '@nestjs/common';
import { IClientRepository } from './repository/client.repository.interface';
import { ClientRepository } from './repository/client.repository';
import { PrismaModule } from '../prisma/prisma.module';

export const clientRepositoryProvider = {
  provide: IClientRepository,
  useClass: ClientRepository,
};
@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [clientRepositoryProvider],
})
export class ClientModule {}
