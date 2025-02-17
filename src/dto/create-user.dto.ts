import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class CreateUsertDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly email: string;
    @IsNumber()
    readonly phonenumber: number;
    
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}