
require('dotenv').config(); 

const express = require('express'); 
const cors = require('cors'); 
const http = require('http'); 
const { Server } = require("socket.io"); 
const axios = require('axios');

const aiEndpoint = "https://ai-surajitai526010179468.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-08-01-preview"
const apiKey = ""

const PORT = process.env.PORT || 4000; 


const app = express();


app.use(cors());
app.use(express.json()); 



const server = http.createServer(app);





const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", 
      methods: ["GET", "POST"], 
    },
  });

  app.get("/", (req, res) => {
    res.send("Server is running");
  })



io.on("connection", (socket) => {
    console.log("User connected ", socket.id); 


    socket.on("send_message", (data) => {
        console.log("Message Received ", data); 

      
        io.emit("receive_message", { clientId: data.clientId, messages: "hii" });
    });
});

server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });