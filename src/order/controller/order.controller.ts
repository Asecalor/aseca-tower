import { IOrderService } from '../service/order.service.interface';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderResponseDto } from '../dto/order-reponse.dto';
import { OrderUpdateDto } from '../dto/order-update.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: IOrderService) { }

  @Post()
  @HttpCode(201)
  @ApiResponse({ status: 201, type: OrderResponseDto })
  async createOrder(@Body() order: CreateOrderDto): Promise<OrderResponseDto> {
    return this.orderService.createOrder(order);
  }

  // @Get()
  // @HttpCode(200)
  // async getOrders(): Promise<OrderResponseDto[]> {
  //   return this.orderService.getOrders();
  // }

  @Put('/:orderId')
  @HttpCode(200)
  async updateOrderStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() orderUpdate: OrderUpdateDto,
  ) {
    return this.orderService.updateOrderStatus(orderId, orderUpdate);
  }

  @Get('/:orderId')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: OrderResponseDto })
  async getOrderById(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.getOrderById(orderId);
  }
}
