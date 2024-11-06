// import express from "express";
// import { WebSocket, WebSocketServer } from "ws";
// import { HandleEvent } from "./utils/handleEvent";
// import jwt from "jsonwebtoken";
// import { SpaceManager } from "./utils/RoomSpace";
// import { handleJoin, handleMove } from "./utils/process";
// import { WebsocketUser } from "./interface";
// const app = express();

// const httpServer = app.listen(8080);
// const wss = new WebSocketServer({
//   server: httpServer,
// });

// wss.on("connection", async (ws: WebSocket) => {
//   console.log("connected");

//   ws.on("message", async (message) => {
//     const data = JSON.parse(message.toString());

//     const { type } = data;

//     switch (type) {
//       case "move":
//         handleMove(data.payload, ws);
//       case "join":
//         handleJoin(data.payload, ws);
//     }
//   });
// });

import { WebSocket, WebSocketServer } from "ws";
import express from "express";
import {
  JoinPayload,
  Message,
  UserJoinMessage,
  UsersSocket,
  WebsocketUser,
} from "./interface";
import { getSpaceAndUser } from "./utils/dbActions";
interface Mysocket extends WebSocket {
  x?: number;
  y?: number;
  userId?: string;
  spaceId: string;
}

let spaces = new Map<string, Mysocket[]>();

const app = express();

const httpServer = app.listen(8080);

const wss = new WebSocketServer({
  server: httpServer,
});

async function handleJoin(data: JoinPayload, ws: Mysocket) {
  const { user, space } = await getSpaceAndUser(data);

  if (!user || !space) {
    throw new Error("invalid credentials");
  }

  if (!spaces.has(data.spaceId)) {
    spaces.set(data.spaceId, []);
  }

  const spaceUsers = spaces.get(data.spaceId);
  const check = spaceUsers?.some((su) => su.userId === user.id);

  ws.userId = user.id;
  ws.x = 0;
  ws.y = 0;
  ws.spaceId = data.spaceId;

  if (spaceUsers && !check) {
    spaceUsers.push(ws);
  }
  const userId = user.id;
  console.log(spaces.get(space.id));

  const message: Message = {
    type: "space-joined",
    payload: {
      spawn: {
        x: ws.x,
        y: ws.y,
      },
      users: spaces
        .get(space.id)
        ?.filter((x) => x.userId !== user.id)
        .map((u) => ({ id: userId })),
    },
  };
  const broadCastMessage: Message = {
    type: "user-joined",
    payload: {
      spawn: {
        x: ws.x,
        y: ws.y,
      },
      users: spaces
        .get(space.id)
        ?.filter((x) => x.userId !== user.id)
        .map((u) => ({ id: userId })),
    },
  };
  const userjoin: UserJoinMessage = {
    type: "user-joined",
    payload: {
      x: ws.x,
      y: ws.y,
      userId: userId,
    },
  };

  ws.send(JSON.stringify(message));

  spaces.get(space.id)?.forEach((ws) => {
    if (ws.userId !== user.id) {
      ws.send(JSON.stringify(userjoin));
    }
  });

  // await broadCast(ws, space.id, userjoin);
}

async function broadCast(
  ws: Mysocket,
  spaceId: string,
  message: UserJoinMessage
) {
  const users = spaces.get(spaceId);

  users?.forEach((ws) => {
    ws.send(JSON.stringify(message));
  });
}
async function handleMove(data: JoinPayload, ws: Mysocket) {}

wss.on("connection", async (ws: Mysocket) => {
  ws.on("message", async (message) => {
    const data = JSON.parse(message.toString());

    const { type } = data;

    switch (type) {
      case "join":
        handleJoin(data.payload, ws);
        break;

      case "move":
        handleMove(data.payload, ws);
        break;
    }
  });
});
