import { IReviewRepository } from './review.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ReviewDTO } from '../dto/review.dto';
import { ReviewRatingDTO } from '../dto/review-rating.dto';

@Injectable()
export class ReviewRepository implements IReviewRepository {
  constructor(@Inject(PrismaService) private readonly db: PrismaService) {}

  async create(
    review: ReviewDTO,
    providerId: number,
  ): Promise<void> {
    await this.db.reviews.create({
      data: {
        clientId: review.clientId,
        providerId,
        orderId: review.orderId,
        rating: review.rating,
        comment: review.comment,
      },
    });
  }

  async findAllByProvider(): Promise<ReviewRatingDTO[]> {
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
        new ReviewRatingDTO(rating.providerId, Math.round(rating._avg.rating)),
    );
  }
}
