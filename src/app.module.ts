import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketService } from './socket/socket/socket.service';
import { SocketModule } from './socket/socket/socket.module';
import { HttpModule } from './http.module';
import {AppConfigModule} from "./config/app-config.module";
import { UserController } from './user/user.controller';
import {UserService} from "./user/user.service"
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schema/user.schema';
@Module({
  imports: [SocketModule,
    AppConfigModule,
    MongooseModule.forRoot(`${process?.env?.MONGO_CONNECTION_OLD}`,{dbName: process?.env?.DB_NAME}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule.forFeature({
      serviceName: 'CustomHttpService',
      config: {
        enableLogging: true,
      },
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, SocketService, UserService],
})
export class AppModule {}
