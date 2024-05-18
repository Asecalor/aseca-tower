import { PrismaClient } from '@prisma/client';

export const getProductsByProviderId = async (
  prisma: PrismaClient,
  providerId: number,
) => {
  return prisma.productProvider.findMany({
    where: {
      providerId,
    },
  });
};

export const getOrderById = async (prisma: PrismaClient, orderId: number) => {
  return prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
};
