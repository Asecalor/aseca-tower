import { ProductPriceDto } from '../dto/product-price.dto';

export const calculateTotalOfOrder = (products: ProductPriceDto[]): number => {
  return products.reduce((acc, product) => acc + product.price, 0);
};
