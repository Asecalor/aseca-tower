import { OrderWithAddressDto } from '../../../src/order/dto/order-with-address.dto';
import { OrderResponseDto } from '../../../src/order/dto/order-reponse.dto';

export const orderRepositoryMock = {
  createOrder: jest.fn(),
  getOrderStatus: jest.fn(),
  updateOrderStatus: jest.fn(),
  updatePendingToAccepted: jest.fn(),
  getOrderWithProductsById: jest.fn(),
  getOrderById: jest.fn(),
  getAllPendingOrders: jest.fn(),
  getProductOrdersByOrderId: jest.fn(),
};

export const createOrderMockWithSuccesfulResponse = (
  order: OrderWithAddressDto,
): OrderResponseDto => {
  return new OrderResponseDto(
    1,
    order.providerId,
    order.address,
    100,
    order.products,
  );
};

export const createOrderMockWithUnSuccesfulResponse = (
  order: OrderWithAddressDto,
): null => {
  return null;
};
