import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import { HandleEvent } from "./utils/handleEvent";
import jwt from "jsonwebtoken";
const app = express();

const httpServer = app.listen(8080);
const wss = new WebSocketServer({
  server: httpServer,
});

wss.on("connection", async (ws: WebSocket) => {
  console.log(process.env.JWT_SECRET);

  ws.on("message", async (message) => {
    const data = JSON.parse(message.toString());

    const { type } = data;
    const user = jwt.verify(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtMnpibzFyMTAwMDBjd3ZkZWsxcm82cnEiLCJ1c2VybmFtZSI6ImtpcmF0IiwicGFzc3dvcmQiOiIkMmIkMTAkQk0uaTFuTWFPYWlxMy9PZXN0WTdqdS50b3ZOTlE1TkVJNkQ3R3huQWo5cWJQRFh3RlJXNE8iLCJpYXQiOjE3MzA1OTAxNDYsImV4cCI6MTczMDU5MTE0Nn0.ZlNmwlrN4RFFYdVwn5cUZx0VGrx9sRB2q-_Nz25lQiQ",
      "pawan1"
    );
    console.log(user);

    const response = await HandleEvent(type, data.payload, ws);
    console.log(response, "is here");

    if (!response) {
      ws.send("error handling the response");
    }
    ws.send(JSON.stringify(response));
  });
});
