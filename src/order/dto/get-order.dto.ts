import { ProductPriceDto } from './product-price.dto';

export class GetOrderDto {
  readonly totalAmount: number;
  readonly status: string;
  readonly providerId: number;
  readonly products: ProductPriceDto[];

  constructor(
    totalAmount: number,
    status: string,
    providerId: number,
    products: ProductPriceDto[],
  ) {
    this.totalAmount = totalAmount;
    this.status = status;
    this.providerId = providerId;
    this.products = products;
  }
}
