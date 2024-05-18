import { PrismaClient } from '@prisma/client';

export class DbCleaner {
  static async clean(prisma: PrismaClient) {
    const tables = ['OrderProduct', 'Order'];
    for (const table of tables) {
      await prisma[table].deleteMany({});
    }
  }
}
