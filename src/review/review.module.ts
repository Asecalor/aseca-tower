import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { IReviewRepository } from './repository/review.repository.interface';
import { ReviewRepository } from './repository/review.repository';
import { ReviewService } from './service/review.service';
import { IReviewService } from './service/review.service.interface';
import { ReviewController } from './controller/review.controller';
import { orderRepositoryProvider } from '../order/order.module';
import { providerRepositoryProvider } from 'src/provider/provider.module';

export const reviewRepositoryProvider = {
  provide: IReviewRepository,
  useClass: ReviewRepository,
};

export const reviewServiceProvider = {
  provide: IReviewService,
  useClass: ReviewService,
};

@Module({
  imports: [PrismaModule],
  controllers: [ReviewController],
  providers: [
    reviewRepositoryProvider,
    reviewServiceProvider,
    orderRepositoryProvider,
    providerRepositoryProvider
  ],
})
export class ReviewModule { }
