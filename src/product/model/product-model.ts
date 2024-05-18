import { OrderProduct } from '../../order/model/order-product-model';
import { ProductProvider } from './product-provider-model';

export type Product = {
  id: number;
  name: string;
  orderProducts: OrderProduct[];
  productProvider: ProductProvider[];
};
