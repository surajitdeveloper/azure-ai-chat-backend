import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketService } from './socket/socket/socket.service';
import { SocketModule } from './socket/socket/socket.module';
import { HttpModule } from './http.module';
import {AppConfigModule} from "./config/app-config.module";
import { CreateUserController } from './user/create-user/create-user.controller';
import { CreateUserModule } from './user/create-user/create-user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
@Module({
  imports: [SocketModule,
    AppConfigModule,
    MongooseModule.forRoot(`${process?.env?.MONGO_CONNECTION}`,{dbName: process?.env?.DB_NAME}),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    HttpModule.forFeature({
      serviceName: 'CustomHttpService',
      config: {
        enableLogging: true,
      },
    }),
    CreateUserModule,
  ],
  controllers: [AppController, CreateUserController],
  providers: [AppService, SocketService],
})
export class AppModule {}
