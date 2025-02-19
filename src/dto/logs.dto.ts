import { IsString, IsOptional } from "class-validator";
export class LogsDto {
    @IsString()
    @IsOptional()
     user: string;
    @IsString()
    @IsOptional()
     clientId: string;
    @IsString()
    @IsOptional()
     ai: string;
    @IsString()
    @IsOptional()
     query: string;
    @IsString()
    @IsOptional()
     response: string;
    @IsString()
    @IsOptional()
     querytimestamp: string;
    @IsString()
    @IsOptional()
     responsestamp: string;
    @IsString()
    @IsOptional()
     ip: string;
    @IsString()
    @IsOptional()
     location: string;
    @IsString()
    @IsOptional()
     deviceid: string;
    @IsString()
    @IsOptional()
     browser: string;
    @IsString()
    @IsOptional()
     executedtime: string;
    @IsString()
    @IsOptional()
     status: string;  
    @IsOptional()
     note: any;
    @IsString()
    @IsOptional()
     error: string;
    @IsString()
     logtimestamp: string
}



