import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SalesDTO } from '../dto/sales.dto';

@Injectable()
export class StatsRepository{
  constructor(@Inject(PrismaService) private readonly db: PrismaService) { }

  async getSalesNumberPerDay(): Promise<SalesDTO[]> {
    const sales = await this.db.salesLog.findMany({
      select: {
        createdAt: true,
      },
    });

    const salesByDay: { [date: string]: number } = {};

    sales.forEach((sale) => {
      const date = sale.createdAt.toISOString().split('T')[0];
      if (salesByDay[date]) {
        salesByDay[date]++;
      } else {
        salesByDay[date] = 1;
      }
    });

    return Object.keys(salesByDay).map((date) => (new SalesDTO(date, salesByDay[date])));
  }

  async getAverageOrderAmount(): Promise<number> {
    const result = await this.db.order.aggregate({
      _avg: {
        totalAmount: true,
      },
      where: {
        status: {
          not: 'REJECTED', // Excluir órdenes rechazadas si es necesario
        },
      },
    });

    return result._avg.totalAmount || 0;
  }
}