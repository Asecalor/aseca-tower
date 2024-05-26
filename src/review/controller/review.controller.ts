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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewRatingDTO } from '../dto/review-rating.dto';
import { Review } from '../input/review.input';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(
    @Inject(IReviewService) private readonly reviewService: IReviewService,
  ) { }

  @Post('/:orderId')
  @HttpCode(201)
  async createReview(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() reviewDto: Review
  ) {
    return this.reviewService.createReview(orderId, reviewDto);
  }

  @Get('/rating')
  @ApiResponse({ status: 200, type: [ReviewRatingDTO] })
  async getAllRatingsByProvider() {
    return this.reviewService.findAllByProvider();
  }

  @Get('/rating/:providerId')
  @ApiResponse({ status: 200, type: ReviewRatingDTO })
  async getRatingByProvider(
    @Param('providerId', ParseIntPipe) providerId: number
  ) {
    return this.reviewService.findByProvider(providerId);
  }
}
