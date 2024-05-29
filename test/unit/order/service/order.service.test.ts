
import { IClientRepository } from 'src/client/repository/client.repository.interface';
import { IOrderRepository } from 'src/order/repository/order.repository.interface';
import { OrderService } from 'src/order/service/order.service';
import { IOrderService } from 'src/order/service/order.service.interface';
import { HttpService } from '@nestjs/axios';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { OrderStatus } from 'src/order/model';
import { clientRepositoryMock, orderRepositoryMock } from 'test/util/mock';


describe('Order Service Unit Test', () => {
  let orderService: IOrderService;

  beforeAll(() => {
    orderService = new OrderService(orderRepositoryMock, clientRepositoryMock, new HttpService);
  });

  it('should create an order with one provider product', async () => {
    const clientId = 1;
    const createOrderDto = {
      clientId: clientId,
      providerId: 1,
      products: [
        {
          productId: 1,
          quantity: 5,
        },
      ],
    };

    orderRepositoryMock.create = jest.fn().mockResolvedValue({
      id: 1,
      clientId: 1,
      providerId: 1,
      status: "PENDING",
      address: "CALLE 13",
      products: [
        {
          productId: 1,
          quantity: 5,
        }
      ],
    });

    clientRepositoryMock.getClientAddress = jest.fn().mockResolvedValue("CALLE 13");

    const order = await orderService.createOrder(createOrderDto);
    expect(order.providerId).toBe(1);
    expect(order.products.length).toBe(1);
    expect(clientRepositoryMock.getClientAddress).toHaveBeenCalledWith(clientId);
  });

  it('should not create an order with no existing client', async () => {
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
    clientRepositoryMock.getClientAddress = jest.fn().mockResolvedValue(null);

    await expect(orderService.createOrder(createOrderDto)).rejects.toThrow(
      new NotFoundException('Client not found'),
    );
  });

  it('should not create an order with no existing product', async () => {
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
    clientRepositoryMock.getClientAddress = jest.fn().mockResolvedValue("CALLE 13");

    orderRepositoryMock.create = jest.fn().mockResolvedValue(null);

    await expect(orderService.createOrder(createOrderDto)).rejects.toThrow(
      new ConflictException(
        'Some of products where not found or it not belongs to the provider',
      ),
    );
  });

  it('should get orders for a specific client', async () => {
    const clientId = 1;
    const expectedOrders = [
      { id: 1, clientId, providerId: 1, products: [] },
      { id: 2, clientId, providerId: 2, products: [] },
    ];

    orderRepositoryMock.findByClientId = jest.fn().mockResolvedValue(expectedOrders);

    const orders = await orderService.getOrders(clientId);

    expect(orders).toEqual(expectedOrders);
    expect(orderRepositoryMock.findByClientId).toHaveBeenCalledWith(clientId);
  });

  it('should get all orders', async () => {
    const expectedOrders = [
      { id: 1, clientId: 1, providerId: 1, products: [] },
      { id: 2, clientId: 2, providerId: 2, products: [] },
    ];
    orderRepositoryMock.findAll = jest.fn().mockResolvedValue(expectedOrders);

    const orders = await orderService.getOrders();

    expect(orders).toEqual(expectedOrders);
  });

  it('should update the status of an order', async () => {
    const orderId = 1;
    const nextStatus = OrderStatus.ACCEPTED;
    const currentStatus = OrderStatus.PENDING;

    orderRepositoryMock.getStatus = jest.fn().mockResolvedValue(currentStatus);

    orderRepositoryMock.findById = jest.fn().mockResolvedValue({
      id: orderId,
      clientId: 1,
      providerId: 1,
      products: [],
      status: currentStatus,
    });


    const currentOrder = await orderService.findOrderById(orderId);

    expect(currentOrder.status).toEqual(currentStatus);

    await orderService.updateOrderStatus(orderId, nextStatus);

    orderRepositoryMock.findById = jest.fn().mockResolvedValue({
      id: orderId,
      clientId: 1,
      providerId: 1,
      products: [],
      status: nextStatus,
    });

    const updatedOrder = await orderService.findOrderById(orderId);

    expect(updatedOrder.status).toEqual(nextStatus);
    expect(orderRepositoryMock.update).toHaveBeenCalledWith(orderId, nextStatus);
  });

  it("should update the status of an order from ACCEPTED to DELIVERED", async () => {
    const orderId = 1;
    const nextStatus = OrderStatus.DELIVERED;
    const currentStatus = OrderStatus.ACCEPTED;

    orderRepositoryMock.getStatus = jest.fn().mockResolvedValue(currentStatus);

    orderRepositoryMock.findById = jest.fn().mockResolvedValue({
      id: orderId,
      clientId: 1,
      providerId: 1,
      products: [],
      status: currentStatus,
    });


    const currentOrder = await orderService.findOrderById(orderId);

    expect(currentOrder.status).toEqual(currentStatus);

    await orderService.updateOrderStatus(orderId, nextStatus);

    orderRepositoryMock.findById = jest.fn().mockResolvedValue({
      id: orderId,
      clientId: 1,
      providerId: 1,
      products: [],
      status: nextStatus,
    });

    const updatedOrder = await orderService.findOrderById(orderId);

    expect(updatedOrder.status).toEqual(nextStatus);
    expect(orderRepositoryMock.update).toHaveBeenCalledWith(orderId, nextStatus);

  })

  it('should throw an error when updating the status of a non-existing order', async () => {
    const orderId = 1;
    const nextStatus = OrderStatus.ACCEPTED;

    orderRepositoryMock.getStatus = jest.fn().mockResolvedValue(null);

    await expect(orderService.updateOrderStatus(orderId, nextStatus)).rejects.toThrow(
      new NotFoundException('Order not found'),
    );
  });

  it('should throw an error when updating the status with an invalid status', async () => {
    const orderId = 1;
    const nextStatus = null;
    const currentStatus = OrderStatus.PENDING;

    orderRepositoryMock.getStatus = jest.fn().mockResolvedValue(currentStatus);

    await expect(orderService.updateOrderStatus(orderId, nextStatus)).rejects.toThrow(
      new ConflictException('Invalid status'),
    );
  });

  it('should throw an error when updating the status with an invalid status transition', async () => {
    const orderId = 1;
    const nextStatus = OrderStatus.DELIVERED;
    const currentStatus = OrderStatus.PENDING;

    orderRepositoryMock.getStatus = jest.fn().mockResolvedValue(currentStatus);

    await expect(orderService.updateOrderStatus(orderId, nextStatus)).rejects.toThrow(
      new ConflictException('Invalid status transition'),
    );
  });

  it('should find an order by ID', async () => {
    const orderId = 1;
    const expectedOrder = { id: orderId, clientId: 1, providerId: 1, products: [] };

    orderRepositoryMock.findById = jest.fn().mockResolvedValue(expectedOrder);

    const order = await orderService.findOrderById(orderId);

    expect(order).toEqual(expectedOrder);
  });

  it('should throw an error when finding a non-existing order by ID', async () => {
    const orderId = 1;

    orderRepositoryMock.findById = jest.fn().mockResolvedValue(null);

    await expect(orderService.findOrderById(orderId)).rejects.toThrow(
      new NotFoundException('Order not found'),
    );
  });

})