import { IOrderRepository } from './order.repository.interface';
import { OrderResponseDto } from '../dto/order-reponse.dto';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductOrderDto } from '../dto/product-order.dto';
import { ProductPriceDto } from '../dto/product-price.dto';
import { calculateTotalOfOrder } from '../util/util';
import { OrderWithAddressDto } from '../dto/order-with-address.dto';

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
}
