import { Module } from '@nestjs/common';

import { ClientModule } from './client/client.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ClientModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
