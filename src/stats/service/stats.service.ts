import { Inject, Injectable } from '@nestjs/common';
import { StatsRepository } from '../repository/stats.repository';
import { AverageOrderAmountDTO } from '../dto/average-order-amount.dto';

@Injectable()
export class StatsService {
  constructor(@Inject(StatsRepository) private readonly statsRepository: StatsRepository) { }

  async getSalesNumberByDay() {
    return await this.statsRepository.getSalesNumberPerDay();
  }

  async getAverageOrderTotalAmount() {
    const value= await this.statsRepository.getAverageOrderAmount();
    return new AverageOrderAmountDTO(value)
  }
}