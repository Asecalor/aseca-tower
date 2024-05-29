import { Controller, Get, Inject } from '@nestjs/common';
import { StatsService } from '../service/stats.service';

@Controller('stats')
export class StatsController {
  constructor(@Inject(StatsService) private readonly statsService: StatsService){}

  @Get('sales')
  async getSalesNumberByDay() {
    return await this.statsService.getSalesNumberByDay();
  }

  @Get('average-order-amount')
  async getAverageOrderTotalAmount() {
    return await this.statsService.getAverageOrderTotalAmount();
  }
}