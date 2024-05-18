import { Order } from '../../order/model/order-model';
import { ProductProvider } from '../../product/model/product-provider-model';

export type Provider = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  orders: Order[];
  productProvider: ProductProvider[];
};
