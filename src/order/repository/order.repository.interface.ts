export abstract class IOrderRepository{
  abstract createOrder(order: any): Promise<any>
}