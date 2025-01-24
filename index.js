require("dotenv").config();

const express = require("serverless-express/express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");

const aiEndpoint =
  "https://ai-surajitai526010179468.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-08-01-preview";
const apiKey =
  "9sSLE88DivbuRjsEsM84duv8AcCdMICrdz2i3FvvTC6JeCzvq9NnJQQJ99BAACHYHv6XJ3w3AAAAACOGqKKE ";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://surajitdeveloper.github.io",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  console.log("User connected ", socket.id);

  socket.on("send_message", async (data) => {
    console.log("Message Received ", data);
    if (data.messages.length === 0) return;
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
    console.log("Response from AI ", response?.data?.choices[0]?.message);

    io.emit("receive_message", {
      clientId: data.clientId,
      query: data.messages[0].content,
      response:
        response?.data?.choices?.length > 0
          ? response?.data?.choices[0]?.message?.content
          : "",
    });
  });
});

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

module.exports = server;
