import { Controller, Post, Body, HttpCode, Param, ParseIntPipe, Get } from '@nestjs/common';
import { ClientService } from '../service/client.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateClient } from '../input/client.input';
import { ClientDTO } from '../dto/client.dto';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post()
  @ApiResponse({
    status: 201,
    type: ClientDTO
  })
  async create(@Body() createClientDto: CreateClient) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: [ClientDTO]
  })
  async getClients() {
    return this.clientService.getClients()
  }

  @Get('/:clientId')
  @HttpCode(200)
  async updateOrderStatus(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.clientService.getClientById(clientId)
  }


}
