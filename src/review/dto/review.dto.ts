import { ApiProperty } from '@nestjs/swagger';

export class ReviewDTO {
  @ApiProperty()
  readonly orderId: number;

  @ApiProperty()
  readonly clientId: number;
  
  @ApiProperty()
  readonly rating: number;

  @ApiProperty()
  readonly comment: string;

  constructor(review: ReviewDTO) {
    this.clientId = review.clientId;
    this.orderId = review.orderId;
    this.rating = review.rating;
    this.comment = review.comment;
  }
}
