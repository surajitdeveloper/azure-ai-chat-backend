import { IsString } from "class-validator";
export class CreateUsertDto {
    @IsString()
    readonly user: string;
    @IsString()
    readonly ai: string;
    @IsString()
    readonly query: string;
    @IsString()
    readonly response: string;
    @IsString()
    readonly querytimestamp: string;
    @IsString()
    readonly responsestamp: string;
    @IsString()
    readonly ip: string;
    @IsString()
    readonly location: string;
    @IsString()
    readonly deviceid: string;
    @IsString()
    readonly browser: string;
    @IsString()
    readonly executedtime: string;
    @IsString()
    readonly status: string;    
    @IsString()
    readonly note: string;
    @IsString()
    readonly error: string;
}



