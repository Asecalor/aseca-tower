import { ApiProperty } from "@nestjs/swagger";

export class ReviewRatingDto {
  @ApiProperty()
  readonly providerId: number;

  @ApiProperty()
  readonly rating: number;


  constructor(providerId: number, rating: number) {
    this.providerId = providerId;
    this.rating = rating;
  }
}
