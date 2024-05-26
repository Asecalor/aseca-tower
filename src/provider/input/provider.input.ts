import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class Provider{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;
}