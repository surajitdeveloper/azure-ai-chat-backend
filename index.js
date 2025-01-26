require("dotenv").config();

const express = require("serverless-express/express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");
const fs = require("node:fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const aiEndpoint =
  "https://ai-surajitai526010179468.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-08-01-preview";
const apiKey =
  "9sSLE88DivbuRjsEsM84duv8AcCdMICrdz2i3FvvTC6JeCzvq9NnJQQJ99BAACHYHv6XJ3w3AAAAACOGqKKE";

  const genAI = new GoogleGenerativeAI("AIzaSyCp5l6GGuZ_IKIJwolnQ0pYbR__FhGBAt8");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const origin = ["https://surajitdeveloper.github.io", "http://localhost:3000"];
const origin =  ["https://surajitdeveloper.github.io"];

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const filePath = "./logs.log";

const writeLog = (log) => {
  fs.appendFileSync(filePath, log);
}

const io = new Server(server, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/get-gemini",(req,res)=>{
  

  const prompt = req.body.prompt;


  model.generateContent(prompt).then((result) => {
    const log = `
    AI: Gemini |
    Query: ${req.body.prompt} | 
    Response: ${
      result.response.text()
    } | 
    Time Stamp: ${new Date()}
    \n`;
    writeLog(log);
    res.send({result: result.response.text()});
  });
})

app.get("/logs", (req, res) => {
  res.send(fs.readFileSync(filePath, "utf8")?.replace(/\n/g, "<br />"));
});

io.on("connection", (socket) => {
  socket.on("send_message", async (data) => {
    console.log("Message Received ", data);
    if (data.messages.length === 0) return;
    if (
      !origin.reduce((a, elm) => {
        if (a || socket.handshake.headers.referer.includes(elm)) a = true;
        return a;
      }, false)
    )
      return;
    const response = await axios.post(
      aiEndpoint,
      {
        messages: data.messages,
        temperature: 0.7,
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      }
    );
    // console.log("Response from AI ", response?.data?.choices[0]?.message);
    const responseData = {
      clientId: data.clientId,
      query: data.messages[0].content,
      response:
        response?.data?.choices?.length > 0
          ? response?.data?.choices[0]?.message?.content
          : "",
    };
    io.emit("receive_message", responseData);
    const log = `
    Client ID: ${data.clientId} | 
    AI: Azure |
    Query: ${data.messages[0].content} | 
    Response: ${
      response?.data?.choices?.length > 0
        ? response?.data?.choices[0]?.message?.content
        : ""
    } | 
    Time Stamp: ${new Date()}
    \n`;
    writeLog(log);
  });
});

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

module.exports = server;


