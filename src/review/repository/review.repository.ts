import { IReviewRepository } from './review.repository.interface';
import { ReviewDto } from '../dto/review.dto';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ReviewRatingDto } from '../dto/review-rating.dto';

@Injectable()
export class ReviewRepository implements IReviewRepository {
  constructor(@Inject(PrismaService) private readonly db: PrismaService) {}

  async createReview(
    clientId: number,
    reviewDto: ReviewDto,
    providerId: number,
  ): Promise<void> {
    await this.db.reviews.create({
      data: {
        clientId,
        providerId,
        orderId: reviewDto.orderId,
        rating: reviewDto.rating,
        comment: reviewDto.comment,
      },
    });
  }

  async getAllRatingsByProvider(): Promise<ReviewRatingDto[]> {
    const ratings = await this.db.reviews.groupBy({
      by: ['providerId'],
      _avg: {
        rating: true,
      },
      orderBy: {
        _avg: {
          rating: 'asc',
        },
      },
    });
    return ratings.map(
      (rating) =>
        new ReviewRatingDto(rating.providerId, Math.round(rating._avg.rating)),
    );
  }
}
