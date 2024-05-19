import { ReviewDto } from '../dto/review.dto';

export abstract class IReviewRepository {
  abstract createReview(clientId: number,reviewDto: ReviewDto, providerId: number): Promise<void>
}