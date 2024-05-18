export class ProductPriceDto {
  readonly productId: number;
  readonly price: number;
  readonly quantity: number;

  constructor(productId: number, price: number, quantity: number) {
    this.productId = productId;
    this.price = price;
    this.quantity = quantity;
  }
}
