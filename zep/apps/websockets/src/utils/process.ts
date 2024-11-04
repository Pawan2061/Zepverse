import { Dimension, JoinPayload, JoinRequest } from "../interface";
import { getSpaceAndUser } from "./dbActions";
import { getDimension } from "./dim";
import { SpaceManager } from "./RoomSpace";
const spaceInstance = SpaceManager.getInstance();
const Payload = {
  x: 2,
  y: 3,
};
export async function handleJoin(data: JoinPayload) {
  try {
    const { space, user } = await getSpaceAndUser(data);
    if (!user && !space) {
      spaceInstance.closeServer();
      return {
        type: "join_failed",
        message: "user cannot join",
      };
    } else {
      const users = spaceInstance.addUserToSpace(user!, space!.id);

      spaceInstance.broadCastToUsers(users, space!.id);

      const { width, height } = (await getDimension(space)) as Dimension;

      return {
        type: "space-joined",
        payload: {
          spawn: {
            x: width,
            y: height,
          },
          users: users,
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function handleMove(payload: any) {
  const xMove = Payload.x;
  const yMove = Payload.y;
  

  return {
    type: "moving",
    message: "moving in the server",
  };
}
