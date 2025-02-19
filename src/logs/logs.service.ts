import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {LogsDto} from "../dto/logs.dto"
import {ILogs} from "../interface/logsinterface"

@Injectable()
export class LogsService {
    constructor(@InjectModel('Logs') private logsModel:Model<ILogs>) { }
    async createLog(logsDto: LogsDto): Promise<ILogs> {
       const newLog = await new this.logsModel(logsDto);
       return newLog.save();
    }
    async getLogs(): Promise<ILogs[]> {
        const logs = await this.logsModel.find();
        if (!logs || logs.length == 0) {
            throw new NotFoundException('Logs data not found!');
        }
        return logs;
    }

    async deleteLog(logsId: string): Promise<ILogs> {
        const log = await this.logsModel.findByIdAndDelete(logsId);
       if (!log) {
         throw new NotFoundException(`Logs #${logsId} not found`);
       }
       return log;
    }
}
