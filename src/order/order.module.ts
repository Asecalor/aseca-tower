import { Module } from '@nestjs/common';
import { IOrderService } from './service/order.service.interface';
import { OrderService } from './service/order.service';
import { IOrderRepository } from './repository/order.repository.interface';
import { OrderRepository } from './repository/order.repository';
import { OrderController } from './controller/order.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { clientRepositoryProvider } from '../client/client.module';

export const orderServiceProvider = {
  provide: IOrderService,
  useClass: OrderService,
};

export const orderRepositoryProvider = {
  provide: IOrderRepository,
  useClass: OrderRepository,
};
@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [
    orderServiceProvider,
    orderRepositoryProvider,
    clientRepositoryProvider,
  ],
})
export class OrderModule {}
