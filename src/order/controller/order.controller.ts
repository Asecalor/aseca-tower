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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompleteOrderDTO, OrderDTO } from '../dto';
import { CreateOrder, OrderUpdate } from '../input';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: IOrderService) { }

  @Post()
  @HttpCode(201)
  @ApiResponse({ status: 201, type: CompleteOrderDTO })
  async createOrder(@Body() order: CreateOrder): Promise<CompleteOrderDTO> {
    return this.orderService.createOrder(order);
  }

  @Get()
  @HttpCode(200)
  async getOrders(): Promise<OrderDTO[]> {
    return this.orderService.getOrders();
  }

  @Put('/:orderId')
  @HttpCode(200)
  async updateOrderStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() orderUpdate: OrderUpdate,
  ) {
    return this.orderService.updateOrderStatus(orderId, orderUpdate.status);
  }

  @Get('/:orderId')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: CompleteOrderDTO })
  async getOrderById(@Param('orderId', ParseIntPipe) orderId: number): Promise<CompleteOrderDTO> {
    return this.orderService.findOrderById(orderId);
  }
}
