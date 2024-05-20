import { Module } from '@nestjs/common';

import { ClientModule } from './client/client.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [ClientModule, OrderModule, ReviewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
