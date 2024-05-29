export class AverageOrderAmountDTO {
  readonly averageAmount: number;

  constructor(averageAmount: number) {
    this.averageAmount = averageAmount;
  }
}