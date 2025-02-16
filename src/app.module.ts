import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketService } from './socket/socket/socket.service';
import { SocketModule } from './socket/socket/socket.module';
import { HttpModule } from './http.module';
@Module({
  imports: [SocketModule,
    HttpModule.forFeature({
      serviceName: 'CustomHttpService',
      config: {
        baseURL: 'https://api.example.com',
        enableLogging: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SocketService],
})
export class AppModule {}
