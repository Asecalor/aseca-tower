import { OrderWithAddressDto } from '../../../src/order/dto/order-with-address.dto';
import { OrderResponseDto } from '../../../src/order/dto/order-reponse.dto';

export const orderRepositoryMock = {
  createOrder: jest.fn(),
};

export const createOrderMockWithSuccesfulResponse = (
  order: OrderWithAddressDto,
): OrderResponseDto => {
  return new OrderResponseDto(
    1,
    order.providerId,
    order.address,
    order.products,
  );
};

export const createOrderMockWithUnSuccesfulResponse = (
  order: OrderWithAddressDto,
): null => {
  return null;
};
