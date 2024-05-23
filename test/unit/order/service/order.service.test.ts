import { OrderService } from '../../../../src/order/service/order.service';
import {
  createOrderMockWithSuccesfulResponse,
  createOrderMockWithUnSuccesfulResponse,
  orderRepositoryMock,
} from '../../../util/mock/order.repository.mock';
import {
  clientRepositoryMock,
  getClientAddressMockWithSuccesfulResponse,
  getClientAddressMockWithUnSuccesfulResponse,
} from '../../../util/mock/client.repository.mock';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('Order Service Unit Test', () => {
  let orderService: OrderService;

  beforeAll(() => {
    orderService = new OrderService(orderRepositoryMock, clientRepositoryMock, null);
  });

  it('should create an order with one provider product', async () => {
    const createOrderDto = {
      clientId: 1,
      providerId: 1,
      products: [
        {
          productId: 1,
          quantity: 5,
        },
      ],
    };
    clientRepositoryMock.getClientAddress.mockImplementation(
      (clientId: number) => {
        return getClientAddressMockWithSuccesfulResponse(clientId);
      },
    );

    orderRepositoryMock.createOrder.mockImplementation((order) => {
      return createOrderMockWithSuccesfulResponse(order);
    });
    const order = await orderService.createOrder(createOrderDto);
    expect(order.providerId).toBe(1);
    expect(order.productOrders.length).toBe(1);
  });

  it('should not create an order with not existing client', async () => {
    const createOrderDto = {
      clientId: 1,
      providerId: 1,
      products: [
        {
          productId: 1,
          quantity: 5,
        },
      ],
    };
    clientRepositoryMock.getClientAddress.mockImplementation(
      (clientId: number) => {
        return getClientAddressMockWithUnSuccesfulResponse(clientId);
      },
    );
    await expect(orderService.createOrder(createOrderDto)).rejects.toThrow(
      new NotFoundException('Client not found'),
    );
  });

  it('should not create an order with not existing product', async () => {
    const createOrderDto = {
      clientId: 1,
      providerId: 1,
      products: [
        {
          productId: 1,
          quantity: 5,
        },
      ],
    };
    clientRepositoryMock.getClientAddress.mockImplementation(
      (clientId: number) => {
        return getClientAddressMockWithSuccesfulResponse(clientId);
      },
    );

    orderRepositoryMock.createOrder.mockImplementation((order) => {
      return createOrderMockWithUnSuccesfulResponse(order);
    });
    await expect(orderService.createOrder(createOrderDto)).rejects.toThrow(
      new ConflictException(
        'Some of products where not found or it not belongs to the provider',
      ),
    );
  });
});
