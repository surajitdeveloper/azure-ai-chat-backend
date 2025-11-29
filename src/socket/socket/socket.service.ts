import { Injectable, Inject } from "@nestjs/common";
import { Socket } from "socket.io";
import { HttpService } from "../../http.service";
import { ConfigService } from "@nestjs/config";
var messages = [];
@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, Socket> = new Map();
  constructor(
    @Inject("CustomHttpService")
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) { }
  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);

    socket.on("send_message", async (data) => {
      if (data.messages.length === 0) return;
      // let logs: LogsDto = {
      //   clientId: data.clientId,
      //   query: data.messages[0].content,
      //   querytimestamp: new Date().toISOString(),
      //   user: "",
      //   ai: "",
      //   ip: "",
      //   location: "",
      //   deviceid: "",
      //   browser: "",
      //   executedtime: "",
      //   status: "",
      //   note: "",
      //   error: "",
      //   logtimestamp: "",
      //   response: "",
      //   responsestamp: ""
      // };


      console.log(messages);
      messages.push({ role: "user", content: data?.messages[0]?.content });
      console.log(messages);
      const payload = {
        model: "gpt-4o-mini",
        messages: messages,
      }


      const response: any = await this.httpService.post(
        `${this.configService.get<string>("ai.openai")}/v1/chat/completions`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.configService.get<string>("secretKey")}`,
          },
        }
      );

      const aiResponse = response?.data?.choices[0]?.message?.content || "";

      console.log("Response from AI ", aiResponse);
      const responseData = {
        clientId: data.clientId,
        query: data.messages[0].content,
        response: aiResponse,
      };
      messages.push(response.data.choices[0].message);
      console.log(messages);
      socket.emit(`receive_message_${data.clientId}`, responseData);
    });

    socket.on("disconnect", () => {
      this.connectedClients.delete(clientId);
    });
  }
}
