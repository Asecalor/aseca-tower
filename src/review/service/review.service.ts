import { IReviewService } from './review.service.interface';
import { ReviewDTO } from '../dto/review.dto';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IReviewRepository } from '../repository/review.repository.interface';
import { IOrderRepository } from '../../order/repository/order.repository.interface';
import { ReviewRatingDTO } from '../dto/review-rating.dto';
import { OrderStatus } from 'src/order/model';
import { Review } from '../input/review.input';
import { IProviderRepository } from 'src/provider/repository/provider.repository.interface';

@Injectable()
export class ReviewService implements IReviewService {
  constructor(
    @Inject(IReviewRepository)
    private readonly reviewRepository: IReviewRepository,
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
    @Inject(IProviderRepository)
    private readonly providerRepository: IProviderRepository,
  ) { }

  async createReview(orderId: number, review: Review) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (order.clientId !== review.clientId) {
      throw new ConflictException('You are not allowed to review this order');
    }
    if (order.status !== 'DELIVERED') {
      throw new ConflictException('You can only review delivered orders');
    }
    const reviewDto = new ReviewDTO({ ...review, orderId });
    await this.reviewRepository.create(
      reviewDto,
      order.providerId,
    );
    await this.orderRepository.update(reviewDto.orderId, OrderStatus.REVIEWED);
  }

  async findAllByProvider(): Promise<ReviewRatingDTO[]> {
    return this.reviewRepository.findRatings();
  }

  async findByProvider(providerId: number): Promise<ReviewRatingDTO> {
    const provider = await this.providerRepository.findById(providerId);
    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    return this.reviewRepository.findRatingsByProviderId(providerId);
  }

}
