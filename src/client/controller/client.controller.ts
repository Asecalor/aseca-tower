import { Controller, Post, Body, HttpCode, Param, ParseIntPipe, Get } from '@nestjs/common';
import { ClientService } from '../service/client.service';
import { CreateClientDto } from '../dto/create-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get('/:clientId')
  @HttpCode(200)
  async updateOrderStatus(@Param('clientId',ParseIntPipe) clientId: number){
    return this.clientService.getClientById(clientId)}


}
