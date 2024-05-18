import { PrismaClient } from '@prisma/client';
import { IOrderRepository } from '../../../../src/order/repository/order.repository.interface';
import { OrderRepository } from '../../../../src/order/repository/order.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { DbCleaner } from '../../../util/db.cleaner';
import { getClientById } from '../../../util/queries/client.repository.queries';
import {
  getOrderById,
  getProductsByProviderId,
} from '../../../util/queries/order.repository.queries';
import { OrderWithAddressDto } from '../../../../src/order/dto/order-with-address.dto';
import { ProductOrderDto } from '../../../../src/order/dto/product-order.dto';
import { OrderModule } from '../../../../src/order/order.module';
import { PrismaModule } from '../../../../src/prisma/prisma.module';

describe('OrderRepository Unit Test', () => {
  let orderRepository: IOrderRepository;
  let prisma: PrismaClient;

  const orderRepositoryProvider = {
    provide: IOrderRepository,
    useClass: OrderRepository,
  };
  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [OrderModule, PrismaModule],
      providers: [orderRepositoryProvider],
    }).compile();
    orderRepository = app.get<IOrderRepository>(IOrderRepository);
    prisma = new PrismaClient();
  });

  beforeEach(async () => {
    await DbCleaner.clean(prisma);
  });

  it('should create an order with one provider product', async () => {
    const client = await getClientById(prisma, 1);
    const products = await getProductsByProviderId(prisma, 1);
    const oneProduct: ProductOrderDto[] = products
      .slice(0, 1)
      .map((product) => ({
        productId: product.productId,
        quantity: 1,
      }));
    const orderWithAddress: OrderWithAddressDto = new OrderWithAddressDto(
      1,
      1,
      client.address,
      oneProduct,
    );
    const order = await orderRepository.createOrder(orderWithAddress);
    expect(order.productOrders.length).not.toBe(products.length);
    expect(order.productOrders.length).toBe(oneProduct.length);
    expect(order.providerId).toBe(1);
    expect(order.clientAddress).toBe(client.address);
  });

  it('should create an order with all provider products', async () => {
    const client = await getClientById(prisma, 1);
    const products = await getProductsByProviderId(prisma, 1);
    const productOrderDto: ProductOrderDto[] = products.map((product) => ({
      productId: product.productId,
      quantity: 1,
    }));
    const orderWithAddress: OrderWithAddressDto = new OrderWithAddressDto(
      1,
      1,
      client.address,
      productOrderDto,
    );
    const order = await orderRepository.createOrder(orderWithAddress);
    const orderCreated = await getOrderById(prisma, order.orderId);
    expect(orderCreated.status).toBe('PENDING');
    expect(order.productOrders.length).toBe(productOrderDto.length);
    expect(order.providerId).toBe(1);
    expect(order.clientAddress).toBe(client.address);
  });

  it('should not create an order with invalid providerId', async () => {
    const client = await getClientById(prisma, 1);
    const products = await getProductsByProviderId(prisma, 1);
    const productOrderDto: ProductOrderDto[] = products.map((product) => ({
      productId: product.productId,
      quantity: 1,
    }));
    const orderWithAddress: OrderWithAddressDto = new OrderWithAddressDto(
      1,
      99999,
      client.address,
      productOrderDto,
    );
    const order = await orderRepository.createOrder(orderWithAddress);
    expect(order).toBeNull();
  });

  it('should not create an order with invalid product', async () => {
    const client = await getClientById(prisma, 1);
    const products = await getProductsByProviderId(prisma, 1);
    const productOrderDto: ProductOrderDto[] = products.map((product) => ({
      productId: product.productId,
      quantity: 1,
    }));
    productOrderDto.push({ productId: 99999, quantity: 1 });
    const orderWithAddress: OrderWithAddressDto = new OrderWithAddressDto(
      1,
      1,
      client.address,
      productOrderDto,
    );
    const order = await orderRepository.createOrder(orderWithAddress);
    expect(order).toBeNull();
  });
});
