import { ApiProperty } from "@nestjs/swagger";

export class ClientDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    address: string;

    constructor(client: ClientDTO) {
        this.id = client.id;
        this.name = client.name;
        this.lastName = client.lastName;
        this.email = client.email;
        this.address = client.address;
    }
}