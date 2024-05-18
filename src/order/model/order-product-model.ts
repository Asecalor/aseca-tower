import { Product } from '../../product/model/product-model';
import { Order } from './order-model';

export type OrderProduct = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  order: Order;
  product: Product;
};
