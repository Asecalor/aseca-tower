import { Product } from './product-model';
import { Provider } from '../../provider/model/provider-model';

export type ProductProvider={
  id : number,
  productId: number,
  providerId: number,
  product: Product,
  provider: Provider
  price: number
}