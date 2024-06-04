import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IClientRepository } from '../../../src/client/repository/client.repository.interface';
import { ClientRepository } from '../../../src/client/repository/client.repository';
import { IClientService } from '../../../src/client/service/client.service.interface';
import { ClientService } from '../../../src/client/service/client.service';
import { IOrderService } from '../../../src/order/service/order.service.interface';
import { OrderService } from '../../../src/order/service/order.service';
import { IOrderRepository } from '../../../src/order/repository/order.repository.interface';
import { OrderRepository } from '../../../src/order/repository/order.repository';
import { OrderController } from '../../../src/order/controller/order.controller';
import { PrismaModule } from '../../../src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';


export const clientRepositoryProvider = {
  provide: IClientRepository,
  useClass: ClientRepository,
};

export const clientServiceProvider = {
  provide: IClientService,
  useClass: ClientService,
};

export const orderServiceProvider = {
  provide: IOrderService,
  useClass: OrderService,
};

export const orderRepositoryProvider = {
  provide: IOrderRepository,
  useClass: OrderRepository,
};


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.test',
    }),
    PrismaModule,
    HttpModule
  ],
  providers:[
    clientServiceProvider,
    clientRepositoryProvider,
    orderServiceProvider,
    orderRepositoryProvider,
  ],
  controllers:[OrderController]
})
export class TestingConfigModule {}
