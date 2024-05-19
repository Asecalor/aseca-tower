import { IReviewRepository } from './review.repository.interface';
import { ReviewDto } from '../dto/review.dto';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReviewRepository implements  IReviewRepository{

  constructor(@Inject(PrismaService) private readonly db: PrismaService) {}

  async createReview(clientId: number, reviewDto: ReviewDto, providerId: number): Promise<void> {
    await this.db.reviews.create({
      data: {
        clientId,
        providerId,
        orderId: reviewDto.orderId,
        rating: reviewDto.rating,
        comment: reviewDto.comment
      }
    });
  }



}