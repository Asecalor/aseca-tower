import { ReviewRatingDTO } from "../dto/review-rating.dto";
import { ReviewDTO } from "../dto/review.dto";
import { Review } from "../input/review.input";


export abstract class IReviewService {
  abstract createReview(orderId: number, review: Review): Promise<void>;

  abstract findAllByProvider(): Promise<ReviewRatingDTO[]>;

  abstract findByProvider(providerId: number): Promise<ReviewRatingDTO>;

}
