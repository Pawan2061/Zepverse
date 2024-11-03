import { Dimension, JoinPayload, JoinRequest } from "../interface";
import { getSpaceAndUser } from "./dbActions";
import { getDimension } from "./dim";
import { SpaceManager } from "./RoomSpace";

export async function handleJoin(data: JoinPayload) {
  try {
    const { space, user } = await getSpaceAndUser(data);
    if (!user) {
      return {
        type: "join_failed",
        message: "user cannot join",
      };
    }

    const users = SpaceManager.getInstance().addUserToSpace(user, space);

    const { width, height } = (await getDimension(space)) as Dimension;

    return {
      type: "join_sucess",
      payload: {
        spawn: {
          x: width,
          y: height,
        },
        users: users,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export async function handleMove(payload: any) {
  return {
    type: "moving",
    message: "moving in the server",
  };
}
