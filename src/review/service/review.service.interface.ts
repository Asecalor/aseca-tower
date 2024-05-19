import { ReviewDto } from '../dto/review.dto';

export abstract class IReviewService{
  abstract createReview(clientId: number,reviewDto: ReviewDto): Promise<void>
}