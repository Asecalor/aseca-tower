import { ApiProperty } from '@nestjs/swagger';

export class ProductProviderDTO {
    @ApiProperty()
    readonly productId : number;
    @ApiProperty()
    readonly productName: string
    @ApiProperty()
    readonly providerId: number
    @ApiProperty()
    readonly providerName: string
    @ApiProperty()
    readonly providerLastName: string
  
    constructor(productProviderDTO: ProductProviderDTO) {
    this.productId = productProviderDTO.productId;
    this.productName = productProviderDTO.productName;
    this.providerId = productProviderDTO.providerId;
    this.providerName = productProviderDTO.providerName;
    this.providerLastName = productProviderDTO.providerLastName;
    }
}