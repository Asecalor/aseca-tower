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
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiQuery({ name: 'clientId', required: false })
  async getOrders(@Query('clientId', new ParseIntPipe({optional:true})) clientId?: number): Promise<OrderDTO[]> {
    return this.orderService.getOrders(clientId);
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
