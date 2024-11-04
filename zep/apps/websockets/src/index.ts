import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import { HandleEvent } from "./utils/handleEvent";
import jwt from "jsonwebtoken";
import { SpaceManager } from "./utils/RoomSpace";
const app = express();

const httpServer = app.listen(8080);
const wss = new WebSocketServer({
  server: httpServer,
});

wss.on("connection", async (ws: WebSocket) => {
  ws.on("message", async (message) => {
    const data = JSON.parse(message.toString());

    const { type } = data;

    if (type == "join") {
      await HandleEvent(type, data.payload, ws);
    } else {
      await HandleEvent(type, data.payload, ws);
    }
  });
});
