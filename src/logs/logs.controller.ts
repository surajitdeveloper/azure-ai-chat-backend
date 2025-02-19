import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { LogsDto } from "src/dto/logs.dto";
import { LogsService } from "./logs.service";

@Controller("logs")
export class LogsController {
  constructor(private readonly logsService: LogsService) {}
  @Post('/create')
  async createLog(@Res() response, @Body() logsDto: LogsDto) {
    try {
      const newLog = await this.logsService.createLog(logsDto);
        return response.status(HttpStatus.CREATED).json({
        message: "Log has been created successfully",
        newLog,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "Error: Log not created!",
        error: "Bad Request",
      });
    }
  }
  
  @Get('/get')
  async getLog(@Res() response) {
    try {
      const logsData = await this.logsService.getLogs();
      return response.status(HttpStatus.OK).json({
        message: "Logs data found successfully",
        logsData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  
  @Delete("/:id")
  async deleteLog(@Res() response, @Param("id") logId: string) {
    try {
      const deleteLog = await this.logsService.deleteLog(logId);
      return response.status(HttpStatus.OK).json({
        message: "Log deleted successfully",
        deleteLog,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
