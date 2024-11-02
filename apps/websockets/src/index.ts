import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import { HandleEvent } from "./utils/handleEvent";
const app = express();

const httpServer = app.listen(8080);
const wss = new WebSocketServer({
  server: httpServer,
});

wss.on("connection", async (ws: WebSocket) => {
  ws.on("message", async (message) => {
    const data = JSON.parse(message.toString());

    const { type } = data;

    const response = await HandleEvent(type, data.payload, ws);
    console.log(response, "is here");

    if (!response) {
      ws.send("error handling the response");
    }
    ws.send(JSON.stringify(response));
  });
});
