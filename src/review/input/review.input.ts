import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class Review {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly clientId: number;
    
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Max(10)
    @ApiProperty()
    readonly rating: number;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly comment: string;
  }