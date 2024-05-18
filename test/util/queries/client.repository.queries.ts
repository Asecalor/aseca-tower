import { PrismaClient } from '@prisma/client';

export const getClientById = async (prisma: PrismaClient, clientId: number) => {
  return prisma.client.findUnique({
    where: {
      id: clientId,
    },
  });
};
