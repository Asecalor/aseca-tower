import { ApiProperty } from "@nestjs/swagger";
import { CreateClientDto } from "./create-client.dto";

export class Client extends CreateClientDto {
    @ApiProperty()
    id: number;

    constructor({ id, ...client }: Client) {
        super(client);
        this.id = id;
    }
}