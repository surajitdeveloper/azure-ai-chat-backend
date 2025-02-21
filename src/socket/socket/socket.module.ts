import { Module } from "@nestjs/common";
import { SocketGateway } from "./socket.gateway";
import { SocketService } from "./socket.service";
import { HttpModule } from "../../http.module";
import {LogsService} from "../../logs/logs.service"
import {LogsModule} from "../../logs/logs.module"
@Module({
  imports: [
    HttpModule.forFeature({
      serviceName: "CustomHttpService",
      config: {
        enableLogging: true,
      },
    }),
    LogsModule
  ],
  providers: [SocketGateway, SocketService],
  exports: [SocketGateway, SocketService],
})
export class SocketModule {}
