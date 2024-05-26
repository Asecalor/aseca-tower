import { Controller, Post, Body, HttpCode, Param, ParseIntPipe, Get, Inject } from '@nestjs/common';
import { ClientService } from '../service/client.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateClient } from '../input/client.input';
import { ClientDTO } from '../dto/client.dto';
import { IClientService } from '../service/client.service.interface';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(@Inject(IClientService) private readonly clientService: IClientService) { }

  @Post()
  @ApiResponse({
    status: 201,
    type: ClientDTO
  })
  async create(@Body() createClientDto: CreateClient) {
    return this.clientService.createClient(createClientDto);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: [ClientDTO]
  })
  async getClients() {
    return this.clientService.findAllClients()
  }

  @Get('/:clientId')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: ClientDTO
  })
  async updateOrderStatus(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.clientService.findClientById(clientId)
  }


}
