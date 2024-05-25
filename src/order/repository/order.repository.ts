import { IOrderRepository } from './order.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { calculateTotalOfOrder } from '../util/util';
import { OrderStatus } from '../model';
import { CreateOrder } from '../input';
import { CompleteOrderDTO, CompleteProductDTO, OrderDTO, ProductOrderDTO } from '../dto';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(@Inject(PrismaService) private readonly db: PrismaService) { }

  async create(order: CreateOrder): Promise<CompleteOrderDTO> {
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

    return new CompleteOrderDTO({ ...orderCreated, products: products });
  }

  async getStatus(orderId: number): Promise<string | null> {
    const order = await this.db.order.findUnique({
      where: {
        id: orderId,
      },
      select: {
        status: true
      }
    });
    return order?.status || null;
  }

  async update(orderId: number, status: OrderStatus): Promise<void> {
    await this.db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });
  }

  async createLog(orderId: number): Promise<void> {
    await this.db.salesLog.create({
      data: {
        orderId,
      },
    });
  }

  async findById(orderId: number): Promise<CompleteOrderDTO> {
    const order = await this.db.order.findUnique({
      where: {
        id: orderId,

      },
      include: {
        orderProduct: true,
        client: {
          select: {
            address: true
          }
        }
      }
    });
    if (!order) {
      return null;
    }

    const products = order.orderProduct.map(product => new ProductOrderDTO(product))

    return new CompleteOrderDTO({ ...order, products, adress: order.client.address });

  }

  async delete(orderId: number): Promise<void> {
    await this.db.order.delete({
      where: {
        id: orderId,
      },
    });
  }

  async findByStatus(status: OrderStatus): Promise<OrderDTO[]> {
    return await this.db.order.findMany({
      where: {
        status,
      },
    });
  }

  async findAll(): Promise<OrderDTO[]> {
    return await this.db.order.findMany();
  }

  async getProductOrdersByOrderId(orderId: number): Promise<ProductOrderDTO[]> {
    const orderProducts = await this.db.orderProduct.findMany({
      where: {
        orderId,
      },
    });
    return orderProducts.map(
      (orderProduct) =>
        new ProductOrderDTO(orderProduct),
    );
  }

  private async getProductsWithProvider(
    products: ProductOrderDTO[],
    providerId: number,
  ): Promise<CompleteProductDTO[]> {
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
        return new CompleteProductDTO({ ...product, price: productWithProvider.price });
      })
      .filter((productDto) => productDto !== null);
  }
}
