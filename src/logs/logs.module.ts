import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { Logs, LogsSchema } from '../schema/logs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logs.name, schema: LogsSchema }]),  
  ],
  providers: [LogsService],
  controllers: [LogsController],
  exports: [LogsService], 
})
export class LogsModule {}