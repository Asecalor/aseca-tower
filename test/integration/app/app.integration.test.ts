import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Test } from '@nestjs/testing';
import { getOrderById, getProductsByProviderId } from '../../util/queries/order.repository.queries';
import { ProductOrderDTO } from '../../../src/order/dto';
import { CreateOrder } from '../../../src/order/input';
import * as request from 'supertest';
import { TestingConfigModule } from '../util/test.config.module';
import * as nock from 'nock';

describe ('App Integration Test', () => {
  let app: INestApplication
  let prisma: PrismaClient


  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TestingConfigModule],
    }).compile()

    app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
    await app.listen(3000)
    prisma = new PrismaClient()
  })
  afterAll(async () => {
    await prisma.$disconnect()
    await app.close()
  })

  it ('/order (POST) - should create an order with one provider product', async () => {
    const products = await getProductsByProviderId(prisma, 1)
    const oneProduct: ProductOrderDTO[] = products
      .slice(0,1)
      .map((product) => ({
        productId: product.productId,
        quantity: 1,
      }))

    const orderInput: CreateOrder = {
      providerId: 1,
      clientId: 1,
      products: oneProduct,
    }
    const response = await request(app.getHttpServer())
      .post('/order')
      .send(orderInput)
      .expect(201)
    expect(response.body.products.length).not.toBe(products.length)
    expect(response.body.products.length).toBe(oneProduct.length)
    expect(response.body.providerId).toBe(1)
    expect(response.body.status).toBe('PENDING')
  })

  it('/order (POST) - should create an order with all provider products', async () => {
    const products = await getProductsByProviderId(prisma, 1)
    const productOrderDto: ProductOrderDTO[] = products.map((product) => ({
      productId: product.productId,
      quantity: 1,
    }))
    const orderInput: CreateOrder = {
      providerId: 1,
      clientId: 1,
      products: productOrderDto,
    }
    const response = await request(app.getHttpServer())
      .post('/order')
      .send(orderInput)
      .expect(201)
    expect(response.body.products.length).toBe(products.length)
    expect(response.body.providerId).toBe(1)
    expect(response.body.status).toBe('PENDING')
  })

  it('/order (POST) - should not create order with insufficient stock', async () => {
    const products = await getProductsByProviderId(prisma, 1)
    const oneProduct: ProductOrderDTO[] = products
      .slice(0, 1)
      .map((product) => ({
        productId: product.productId,
        quantity: 999999,
      }))
    const orderInput: CreateOrder = {
      providerId: 1,
      clientId: 1,
      products: oneProduct,
    }
    await request(app.getHttpServer())
      .post('/order')
      .send(orderInput)
      .expect(409)
  })

  it ('/order (POST) - should not create order with product that does not belong to provider', async () => {
    const oneProduct: ProductOrderDTO[] = [new ProductOrderDTO({
      productId: 999999,
      quantity: 4,
    })]
    const orderInput: CreateOrder = {
      providerId: 2,
      clientId: 1,
      products: oneProduct,
    }
    await request(app.getHttpServer())
      .post('/order')
      .send(orderInput)
      .expect(409)
  })

  it ('order (POST) - should order be with status PENDING if wms-api is not working' , async() =>{
    const products = await getProductsByProviderId(prisma, 1)
    const oneProduct: ProductOrderDTO[] = products
      .slice(0, 1)
      .map((product) => ({
        productId: product.productId,
        quantity: 999999,
      }))
    const orderInput: CreateOrder = {
      providerId: 1,
      clientId: 1,
      products: oneProduct,
    }
    nock('http://localhost:3001')
      .put('/order/1')
      .reply(500);


    const response = await request(app.getHttpServer())
      .post('/order')
      .send(orderInput)
      .expect(201)
    expect(response.body.status).toBe('PENDING')

    setTimeout(async () => {
      const order = await getOrderById(prisma, response.body.id);
      expect(order.status).toBe('PENDING');
    }, 2000);
  })
})