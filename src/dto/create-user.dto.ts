import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class CreateUsertDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly email: string;
    @IsNumber()
    @IsNotEmpty()
    readonly phonenumber: number;
    
    @IsNumber()
    @IsNotEmpty()
    readonly password: string;
}