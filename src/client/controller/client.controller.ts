import { Controller, Post, Body, HttpCode, Param, ParseIntPipe, Get } from '@nestjs/common';
import { ClientService } from '../service/client.service';
import { Client, CreateClientDto } from '../dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post()
  @ApiResponse({
    status: 201,
    type: Client
  })
  async create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: [Client]
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
