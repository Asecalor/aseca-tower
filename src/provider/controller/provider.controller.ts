import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { IProviderService } from "../service/provider.service.interface";
import { Provider } from "../input/provider.input";
import { ProviderDTO } from "../dto/provider.dto";
import { AddProductToProviderDTO } from '../../product/dto/add.product.to.provider.dto';

@ApiTags('Provider')
@Controller('provider')
export class ProviderController {
    constructor(@Inject(IProviderService) private readonly providerService: IProviderService) { }

    @Post()
    @ApiResponse({ status: 201, type: ProviderDTO })
    async createProvider(@Body() provider: Provider) {
        return this.providerService.createProvider(provider);
    }


    @Get()
    @ApiResponse({ status: 200, type: [ProviderDTO] })
    async getAllProviders() {
        return this.providerService.findAllProviders();
    }

    @Get('/:id')
    @ApiResponse({ status: 200, type: ProviderDTO })
    async getProviderById(@Param('id', ParseIntPipe) id: number) {
        return this.providerService.findProviderById(id);
    }
    @Post('/:providerId')
    @HttpCode(200)
    @ApiResponse({ status: 200 })
    async assignProviderToProduct(@Param('providerId', ParseIntPipe) providerId: number,
                                  @Body() product: AddProductToProviderDTO) {
        await this.providerService.assignProviderToProduct(providerId, product);
    }
}