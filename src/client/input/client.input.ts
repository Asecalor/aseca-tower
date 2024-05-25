import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateClient {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    address: string;
}
