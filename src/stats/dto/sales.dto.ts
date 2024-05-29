export class SalesDTO {
  readonly date: string;
  readonly sales: number;

  constructor(date: string, sales: number) {
    this.date = date;
    this.sales = sales;
  }
}