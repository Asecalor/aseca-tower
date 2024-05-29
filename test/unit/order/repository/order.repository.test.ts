// import { Test, TestingModule } from "@nestjs/testing";
// import { PrismaClient } from "@prisma/client";
// import { ProductOrderDTO } from "src/order/dto";
// import { CreateOrder } from "src/order/input";
// import { OrderModule } from "src/order/order.module";
// import { OrderRepository } from "src/order/repository/order.repository";
// import { IOrderRepository } from "src/order/repository/order.repository.interface";
// import { PrismaModule } from "src/prisma/prisma.module";
// import { DbCleaner } from "test/util/db.cleaner";
// import { getClientById } from "test/util/queries/client.repository.queries";
// import { getOrderById, getProductsByProviderId } from "test/util/queries/order.repository.queries";

// describe('OrderRepository Unit Test', () => {
//   let orderRepository: IOrderRepository;
//   let prisma: PrismaClient;

//   const orderRepositoryProvider = {
//     provide: IOrderRepository,
//     useClass: OrderRepository,
//   };
//   beforeAll(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       imports: [OrderModule, PrismaModule],
//       providers: [orderRepositoryProvider],
//     }).compile();
//     orderRepository = app.get<IOrderRepository>(IOrderRepository);
//     prisma = new PrismaClient();
//   });

//   beforeEach(async () => {
//     await DbCleaner.clean(prisma);
//   });

//   it('should create an order with one provider product', async () => {
//     const client = await getClientById(prisma, 1);
//     const products = await getProductsByProviderId(prisma, 1);
//     const oneProduct: ProductOrderDTO[] = products
//       .slice(0, 1)
//       .map((product) => ({
//         productId: product.productId,
//         quantity: 1,
//       }));
//     const orderInput: CreateOrder =
//     {
//       providerId: 1,
//       clientId: 1,
//       products: oneProduct,
//     };
//     const order = await orderRepository.create(orderInput);
//     expect(order.products.length).not.toBe(products.length);
//     expect(order.products.length).toBe(oneProduct.length);
//     expect(order.providerId).toBe(1);
//     expect(order.address).toBe(client.address);
//   });

//   it('should create an order with all provider products', async () => {
//     const client = await getClientById(prisma, 1);
//     const products = await getProductsByProviderId(prisma, 1);
//     const productOrderDto: ProductOrderDTO[] = products.map((product) => ({
//       productId: product.productId,
//       quantity: 1,
//     }));
//     const orderInput: CreateOrder = {
//       clientId: 1,
//       providerId: 1,
//       products: productOrderDto,
//     };
//     const order = await orderRepository.create(orderInput);
//     const orderCreated = await getOrderById(prisma, order.id);
//     expect(orderCreated.status).toBe('PENDING');
//     expect(order.products.length).toBe(productOrderDto.length);
//     expect(order.providerId).toBe(1);
//     expect(order.address).toBe(client.address);
//   });

//   it('should not create an order with invalid providerId', async () => {
//     const client = await getClientById(prisma, 1);
//     const products = await getProductsByProviderId(prisma, 1);
//     const productOrderDto: ProductOrderDTO[] = products.map((product) => ({
//       productId: product.productId,
//       quantity: 1,
//     }));
//     const orderInput: CreateOrder = {
//       clientId: 1,
//       providerId: 99999,
//       products: productOrderDto,
//     };
//     const order = await orderRepository.create(orderInput);
//     expect(order).toBeNull();
//   });

//   it('should not create an order with invalid product', async () => {
//     const client = await getClientById(prisma, 1);
//     const products = await getProductsByProviderId(prisma, 1);
//     const productOrderDto: ProductOrderDTO[] = products.map((product) => ({
//       productId: product.productId,
//       quantity: 1,
//     }));
//     productOrderDto.push({ productId: 99999, quantity: 1 });
//     const orderInput: CreateOrder = {
//       clientId: 1,
//       providerId: 1,
//       products: productOrderDto,
//     };
//     const order = await orderRepository.create(orderInput);
//     expect(order).toBeNull();
//   });
// });
