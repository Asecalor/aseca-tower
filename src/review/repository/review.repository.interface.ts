import { ReviewDTO, } from '../dto/review.dto';
import { ReviewRatingDTO } from '../dto/review-rating.dto';

export abstract class IReviewRepository {
  abstract create(review: ReviewDTO, providerId: number): Promise<void>;

  abstract findAllByProvider(): Promise<ReviewRatingDTO[]>;
}
