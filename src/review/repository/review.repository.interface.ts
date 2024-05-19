import { ReviewDto } from '../dto/review.dto';
import { ReviewRatingDto } from '../dto/review-rating.dto';

export abstract class IReviewRepository {
  abstract createReview(clientId: number,reviewDto: ReviewDto, providerId: number): Promise<void>

  abstract getAllRatingsByProvider(): Promise<ReviewRatingDto[]>
}