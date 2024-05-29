import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StatsController } from './controller/stats.controller';
import { StatsService } from './service/stats.service';
import { StatsRepository } from './repository/stats.repository';


@Module({
  imports: [PrismaModule],
  controllers: [StatsController],
  providers: [
    StatsRepository,StatsService
  ],
})
export class StatsModule{}