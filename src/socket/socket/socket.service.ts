import { Injectable, Inject } from '@nestjs/common';
import { Socket } from 'socket.io';
import {HttpService} from "../../http.service"
@Injectable()
export class SocketService {
    private readonly connectedClients: Map<string, Socket> = new Map();
    // constructor(
    //     @Inject('CustomHttpService')
    //     private readonly httpService: HttpService,
    //   ) {}
  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);

    console.log("socket connected", clientId);
    socket.on("send_message", async (data) => {
        console.log("Socket referer ", socket.handshake.headers);
        console.log("Message Received ", data);
        // if (data.messages.length === 0) return;
        
    
        // console.log("axios conf --->", aiEndpoint,
        //   {
        //     messages: data.messages,
        //     temperature: 0.7,
        //     max_tokens: 100,
        //   })
        // const response = await axios.post(
        //   aiEndpoint,
        //   {
        //     messages: data.messages,
        //     temperature: 0.7,
        //     max_tokens: 100,
        //   },
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //       // "api-key": apiKey,
        //     },
        //   }
        // );
        // // console.log("Response from AI ", response?.data?.choices[0]?.message);
        // const responseData = {
        //   clientId: data.clientId,
        //   query: data.messages[0].content,
        //   response:
        //     response?.data?.choices?.length > 0
        //       ? response?.data?.choices[0]?.message?.content
        //       : "",
        // };
        socket.emit("receive_message", data);
        // const log = `
        // Client ID: ${data.clientId} | 
        // AI: Azure |
        // Query: ${data.messages[0].content} | 
        // Response: ${
        //   response?.data?.choices?.length > 0
        //     ? response?.data?.choices[0]?.message?.content
        //     : ""
        // } | 
        // Time Stamp: ${new Date()}
        // \n`;
      });

      
    socket.on('disconnect', () => {
      this.connectedClients.delete(clientId);
    });

    // Handle other events and messages from the client
  }
  
}
