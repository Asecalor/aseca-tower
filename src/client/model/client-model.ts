import { Order } from '../../order/model/order-model';

export type Client= {
  id: number,
  name: string,
  lastName: string,
  email: string,
  address: string
  orders: Order[]
}