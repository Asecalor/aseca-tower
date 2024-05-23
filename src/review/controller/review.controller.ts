import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { IReviewService } from '../service/review.service.interface';
import { ReviewDto } from '../dto/review.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(
    @Inject(IReviewService) private readonly reviewService: IReviewService,
  ) { }

  @Post('/:clientId')
  @HttpCode(201)
  async createReview(
    @Param('clientId', ParseIntPipe) clientId: number,
    @Body() reviewDto: ReviewDto,
  ) {
    return this.reviewService.createReview(clientId, reviewDto);
  }

  @Get('/ratings')
  async getAllRatingsByProvider() {
    return this.reviewService.getAllRatingsByProvider();
  }
}
