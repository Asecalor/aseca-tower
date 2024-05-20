import { ProductPriceDto } from '../dto/product-price.dto';
import { OrderStatus } from '../model/order-status';

export const calculateTotalOfOrder = (products: ProductPriceDto[]): number => {
  return products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );
};

//rejected and reviewed are terminal states
export const statusTransitions = new Map<OrderStatus, OrderStatus[]>([
  [OrderStatus.PENDING, [OrderStatus.ACCEPTED, OrderStatus.REJECTED]],
  [OrderStatus.ACCEPTED, [OrderStatus.DELIVERED]],
  [OrderStatus.DELIVERED, [OrderStatus.REVIEWED]],
]);
