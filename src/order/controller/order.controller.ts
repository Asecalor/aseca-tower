import { IOrderService } from '../service/order.service.interface';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderResponseDto } from '../dto/order-reponse.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: IOrderService) {}

  @Post('create')
  @HttpCode(201)
  async createOrder(@Body() order: CreateOrderDto): Promise<OrderResponseDto> {
    return this.orderService.createOrder(order);
  }
}
