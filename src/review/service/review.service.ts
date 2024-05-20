import { IReviewService } from './review.service.interface';
import { ReviewDto } from '../dto/review.dto';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IReviewRepository } from '../repository/review.repository.interface';
import { IOrderRepository } from '../../order/repository/order.repository.interface';

@Injectable()
export class ReviewService implements IReviewService {
  constructor(
    @Inject(IReviewRepository)
    private readonly reviewRepository: IReviewRepository,
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async createReview(clientId: number, reviewDto: ReviewDto) {
    const order = await this.orderRepository.getOrderById(reviewDto.orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (order.clientId !== clientId) {
      throw new ConflictException('You are not allowed to review this order');
    }
    if (order.status !== 'DELIVERED') {
      throw new ConflictException('You can only review delivered orders');
    }
    await this.reviewRepository.createReview(
      clientId,
      reviewDto,
      order.providerId,
    );
    await this.orderRepository.updateOrderStatus(reviewDto.orderId, 'REVIEWED');
  }

  async getAllRatingsByProvider() {
    return this.reviewRepository.getAllRatingsByProvider();
  }
}
