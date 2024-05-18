import { ProductOrderDto } from './product-order.dto';

export class OrderWithAddressDto {
  readonly clientId: number;

  readonly providerId: number;

  readonly address: string;

  readonly products: ProductOrderDto[];

  constructor(
    clientId: number,
    providerId: number,
    address: string,
    products: ProductOrderDto[],
  ) {
    this.clientId = clientId;
    this.providerId = providerId;
    this.address = address;
    this.products = products;
  }
}
