import { ReviewDto } from '../dto/review.dto';
import { ReviewRatingDto } from '../dto/review-rating.dto';

export abstract class IReviewService{
  abstract createReview(clientId: number,reviewDto: ReviewDto): Promise<void>

  abstract getAllRatingsByProvider(): Promise<ReviewRatingDto[]>
}