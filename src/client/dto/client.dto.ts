import { CreateClientDto } from "./create-client.dto";

export class Client extends CreateClientDto {
    id: number;

    constructor({ id, ...client }: Client) {
        super(client);
        this.id = id;
    }
}