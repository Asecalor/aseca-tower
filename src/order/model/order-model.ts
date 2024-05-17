import { Client } from '../../client/model/client-model';
import { Provider } from '../../provider/model/provider-model';
import { OrderProduct } from './order-product-model';

export type Order={
  id: number,
  userId: number,
  providerId: number,
  status: string,
  totalAmount: number
  client: Client,
  provider: Provider
  products: OrderProduct[]
}