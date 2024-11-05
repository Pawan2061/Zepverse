import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import { HandleEvent } from "./utils/handleEvent";
import jwt from "jsonwebtoken";
import { SpaceManager } from "./utils/RoomSpace";
import { handleJoin, handleMove } from "./utils/process";
import { WebsocketUser } from "./interface";
const app = express();

const httpServer = app.listen(8080);
const wss = new WebSocketServer({
  server: httpServer,
});

wss.on("connection", async (ws: WebsocketUser) => {
  console.log("connected");

  ws.on("message", async (message) => {
    const data = JSON.parse(message.toString());

    const { type } = data;

    switch (type) {
      case "move":
        handleMove(data.payload, ws);
      case "join":
        handleJoin(data.payload, ws);
    }
  });
});
