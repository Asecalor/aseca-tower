
export class CreateClientDto {
  name: string;
  lastName: string;
  email: string;
  address: string;

  constructor(client: CreateClientDto) {
    this.name = client.name;
    this.lastName = client.lastName;
    this.email = client.email;
    this.address = client.address;
  }
}
