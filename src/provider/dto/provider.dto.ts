import { ApiProperty } from "@nestjs/swagger";

export class ProviderDTO {
    @ApiProperty()
    readonly id: number;
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly lastName: string;
    constructor(provider: ProviderDTO) {
        this.id = provider.id;
        this.name = provider.name;
        this.email = provider.email;
        this.lastName = provider.lastName;
    }
}