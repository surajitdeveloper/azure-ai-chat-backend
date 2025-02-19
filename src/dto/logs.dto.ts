import { IsString, IsOptional } from "class-validator";
export class LogsDto {
    @IsString()
    @IsOptional()
    readonly user: string;
    @IsString()
    @IsOptional()
    readonly ai: string;
    @IsString()
    @IsOptional()
    readonly query: string;
    @IsString()
    @IsOptional()
    readonly response: string;
    @IsString()
    @IsOptional()
    readonly querytimestamp: string;
    @IsString()
    @IsOptional()
    readonly responsestamp: string;
    @IsString()
    @IsOptional()
    readonly ip: string;
    @IsString()
    @IsOptional()
    readonly location: string;
    @IsString()
    @IsOptional()
    readonly deviceid: string;
    @IsString()
    @IsOptional()
    readonly browser: string;
    @IsString()
    @IsOptional()
    readonly executedtime: string;
    @IsString()
    @IsOptional()
    readonly status: string;    
    @IsString()
    @IsOptional()
    readonly note: string;
    @IsString()
    @IsOptional()
    readonly error: string;
    @IsString()
    readonly logtimestamp: string
}



