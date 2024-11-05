import {
  Dimension,
  JoinPayload,
  JoinRequest,
  WebsocketUser,
} from "../interface";
import { getSpaceAndUser } from "./dbActions";
import { getDimension } from "./dim";
import WebSocket from "ws";
import { SpaceManager } from "./RoomSpace";
const spaceInstance = SpaceManager.getInstance();

export async function handleJoin(data: JoinPayload, ws: WebsocketUser) {
  try {
    const { space, user } = await getSpaceAndUser(data);

    if (!user && !space) {
      spaceInstance.closeServer();
      return {
        type: "join_failed",
        message: "user cannot join",
      };
    } else {
      const users = spaceInstance.addUserToSpace(user!, space!.id, ws);
      console.log(users);

      const userInfos = users!.map((ws) => ({
        id: ws.id,
        username: ws.username,
        x: ws.x,
        y: ws.y,
      }));
      console.log(userInfos);
      const { width, height } = (await getDimension(space)) as Dimension;

      const message = {
        type: "space-joined",
        payload: {
          users: users,
          x: 1,
          y: 2,
        },
      };

      spaceInstance.broadCastToUsers(user!, space!.id, message);

      // return {
      //   type: "space-joined",
      //   payload: {
      //     spawn: {
      //       x: width,
      //       y: height,
      //     },
      //     users: users,
      //   },
      // };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function handleMove(payload: any, ws: WebSocket) {
  const xMove = payload.x;
  const yMove = payload.y;

  const moveData = {
    type: "space-joined",
    payload: {
      spawn: {
        x: 12,
        y: 21,
      },
      users: [],
    },
  };
  ws.send(JSON.stringify(moveData));
}
