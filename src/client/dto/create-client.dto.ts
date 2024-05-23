import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  constructor(client: CreateClientDto) {
    this.name = client.name;
    this.lastName = client.lastName;
    this.email = client.email;
    this.address = client.address;
  }
}
