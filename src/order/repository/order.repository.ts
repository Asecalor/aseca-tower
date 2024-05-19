import { IOrderRepository } from './order.repository.interface';
import { OrderResponseDto } from '../dto/order-reponse.dto';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductOrderDto } from '../dto/product-order.dto';
import { ProductPriceDto } from '../dto/product-price.dto';
import { calculateTotalOfOrder } from '../util/util';
import { OrderWithAddressDto } from '../dto/order-with-address.dto';
import { Order } from '../model/order-model';
import { GetOrderDto } from '../dto/get-order.dto';

@Injectable()
export class OrderRepository implements IOrderRepository {

  constructor(@Inject(PrismaService) private readonly db: PrismaService) {}

  async createOrder(
    order: OrderWithAddressDto,
  ): Promise<OrderResponseDto | null> {
    const { providerId, products } = order;
    const productsWithPrice = await this.getProductsWithProvider(
      products,
      providerId,
    );
    if (productsWithPrice.length !== products.length) {
      return null;
    }
    const total = calculateTotalOfOrder(productsWithPrice);
    const orderCreated = await this.db.order.create({
      data: {
        providerId: providerId,
        clientId: order.clientId,
        totalAmount: total,
      },
    });
    await this.db.orderProduct.createMany({
      data: productsWithPrice.map((product) => ({
        orderId: orderCreated.id,
        productId: product.productId,
        quantity: product.quantity,
      })),
    });
    return new OrderResponseDto(
      orderCreated.id,
      orderCreated.providerId,
      order.address,
      total,
      products,
    );
  }

  private async getProductsWithProvider(
    products: ProductOrderDto[],
    providerId: number,
  ): Promise<ProductPriceDto[]> {
    const productsIds = products.map((product) => product.productId);
    const productsWithProvider = await this.db.productProvider.findMany({
      where: {
        productId: {
          in: productsIds,
        },
        providerId,
      },
    });
    return products
      .map((product) => {
        const productWithProvider = productsWithProvider.find(
          (p) => p.productId === product.productId,
        );
        if (!productWithProvider) {
          return null;
        }
        return new ProductPriceDto(
          productWithProvider.productId,
          productWithProvider.price,
          product.quantity,
        );
      })
      .filter((productDto) => productDto !== null);
  }

  async getOrderStatus(orderId: number): Promise<string | null> {
    const order = await this.db.order.findUnique({
      where: {
        id: orderId,
      },
    });
    return order?.status || null;
  }

  async updateOrderStatus(orderId: number, status: string): Promise<void> {
    await this.db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });
  }

  async updatePendingToAccepted(orderId: number): Promise<void> {
    await this.db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: 'ACCEPTED',
      },
    });

    await this.db.salesLog.create({
      data: {
        orderId,
      },
    });
  }

  async getOrderById(orderId: number): Promise<Order> {
    const order= await  this.db.order.findUnique({
      where: {
        id: orderId,
      },
    });
    if(!order){
      return null;
    }
    return{
      id: orderId,
      clientId: order.clientId,
      providerId: order.providerId,
      status: order.status,
      totalAmount: order.totalAmount,
    }
  }
  async getOrderWithProductsById(orderId: number): Promise<GetOrderDto> {
    const order = await this.db.order.findUnique({
      where: {
        id: orderId,
      },
    });
    if (!order) {
      return null;
    }

    const orderWithProducts = await this.db.orderProduct.findMany({
      where: {
        orderId: orderId,
      },
    });

    const productsOrderDto = orderWithProducts.map(p => new ProductOrderDto(
      p.productId,
      p.quantity
    ));

    const productsWithProvider = await this.getProductsWithProvider(productsOrderDto, order.providerId);

    return new GetOrderDto(
      order.totalAmount,
      order.status,
      order.providerId,
      productsWithProvider
    );

  }


}
