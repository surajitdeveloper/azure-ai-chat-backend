import { Injectable, Inject } from '@nestjs/common';
import { Socket } from 'socket.io';
import {HttpService} from "../../http.service"
@Injectable()
export class SocketService {
    private readonly connectedClients: Map<string, Socket> = new Map();
    constructor(
        @Inject('CustomHttpService')
        private readonly httpService: HttpService,
      ) {}
  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);

    console.log("socket connected", clientId);
    socket.on("send_message", async (data) => {
        console.log("Socket referer ", socket.handshake.headers);
        console.log("Message Received ", data);
        
        if (data.messages.length === 0) return;

        const payload = {
                messages: data.messages,
                temperature: 0.7,
                max_tokens: 100,
              }

        const response: any = await this.httpService.post(
          "http://65.21.248.37:8181/v1/chat/completions",payload
        )
        
        const aiResponse = response?.data?.choices[0]?.message?.content || ''
        console.log("Response from AI ", aiResponse);
        const responseData = {
          clientId: data.clientId,
          query: data.messages[0].content,
          response: aiResponse,
        };
        socket.emit(`receive_message_${data.clientId}`, responseData);
        
      });


    socket.on('disconnect', () => {
      this.connectedClients.delete(clientId);
    });

    // Handle other events and messages from the client
  }
  
}
