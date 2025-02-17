import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketService } from './socket/socket/socket.service';
import { SocketModule } from './socket/socket/socket.module';
import { HttpModule } from './http.module';
import {AppConfigModule} from "./config/app-config.module";
import { CreateUserController } from './user/create-user/create-user.controller';
import { CreateUserModule } from './user/create-user/create-user.module';
@Module({
  imports: [SocketModule,
    AppConfigModule,
    HttpModule.forFeature({
      serviceName: 'CustomHttpService',
      config: {
        baseURL: 'https://api.example.com',
        enableLogging: true,
      },
    }),
    CreateUserModule,
  ],
  controllers: [AppController, CreateUserController],
  providers: [AppService, SocketService],
})
export class AppModule {}
