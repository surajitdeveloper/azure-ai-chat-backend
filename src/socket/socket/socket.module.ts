import { Module } from "@nestjs/common";
import { SocketGateway } from "./socket.gateway";
import { SocketService } from "./socket.service";
import { HttpModule } from "../../http.module";
@Module({
  imports: [
    HttpModule.forFeature({
      serviceName: "CustomHttpService",
      config: {
        enableLogging: true,
      },
    }),
  ],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
