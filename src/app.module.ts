import { Module } from '@nestjs/common';

import { ClientModule } from './client/client.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductModule } from './product/product.module';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports:
    [ClientModule,
      ProviderModule,
      OrderModule,
      ProductModule,
      ReviewModule,
      ScheduleModule.forRoot()
    ],
  controllers: [],
  providers: [],
})
export class AppModule { }
