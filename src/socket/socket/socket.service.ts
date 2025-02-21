import { Injectable, Inject } from "@nestjs/common";
import { Socket } from "socket.io";
import { HttpService } from "../../http.service";
import { ConfigService } from "@nestjs/config";
import { LogsDto } from "src/dto/logs.dto";
import { LogsService } from "src/logs/logs.service";
@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, Socket> = new Map();
  constructor(
    @Inject("CustomHttpService")
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly logsService: LogsService
  ) {}
  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);

    socket.on("send_message", async (data) => {
      if (data.messages.length === 0) return;
      let logs: LogsDto = {
        clientId: data.clientId,
        query: data.messages[0].content,
        querytimestamp: new Date().toISOString(),
        user: "",
        ai: "",
        ip: "",
        location: "",
        deviceid: "",
        browser: "",
        executedtime: "",
        status: "",
        note: "",
        error: "",
        logtimestamp: "",
        response: "",
        responsestamp: ""
      };

      const payload = {
        messages: data.messages,
        temperature: 0.7,
        max_tokens: 100,
      };

      const response: any = await this.httpService.post(
        `${this.configService.get<string>("ai.deepseek")}/v1/chat/completions`,
        payload
      );
      logs.response = response?.data?.choices[0]?.message?.content || "";
      logs.responsestamp = new Date().toISOString();
      logs.ip = socket.handshake.address;
      logs.location = socket.handshake.headers.location;
      

      const aiResponse = response?.data?.choices[0]?.message?.content || "";

      logs.status = "success";
      logs.note = {
        clientId: data.clientId,
        query: data.messages[0].content,
        // response: response,
        aiResponse: aiResponse,
        payload: payload
      };
      logs.error = "";
      console.log("Response from AI ", aiResponse);
      const responseData = {
        clientId: data.clientId,
        query: data.messages[0].content,
        response: aiResponse,
      };
      await this.logsService.createLog(logs);
      socket.emit(`receive_message_${data.clientId}`, responseData);
    });

    socket.on("disconnect", () => {
      this.connectedClients.delete(clientId);
    });
  }
}
