import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SocketService } from "./socket/socket/socket.service";
import { SocketModule } from "./socket/socket/socket.module";
import { HttpModule } from "./http.module";
import { AppConfigModule } from "./config/app-config.module";
@Module({
  imports: [
    SocketModule,
    AppConfigModule,
    HttpModule.forFeature({
      serviceName: "CustomHttpService",
      config: {
        enableLogging: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SocketService],
})
export class AppModule {}
