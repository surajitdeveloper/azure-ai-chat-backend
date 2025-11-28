require("dotenv").config();

const express = require("serverless-express/express");
const cors = require("cors");
const http = require("http");
const fs = require("node:fs");


const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const filePath = "./logs.log";




app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/surajit", (req, res) => {
  res.json({status: 100, message: "Server is running"});
})


app.get("/logs", (req, res) => {
  res.send(fs.readFileSync(filePath, "utf8")?.replace(/\n/g, "<br />"));
});


server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

module.exports = server;


