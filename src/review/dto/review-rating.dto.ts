export class ReviewRatingDto{
  readonly providerId:  number;
  readonly rating: number;
  constructor(providerId: number, rating: number) {
    this.providerId = providerId;
    this.rating = rating;
  }
}