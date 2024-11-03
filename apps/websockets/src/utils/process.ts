import { JoinPayload, JoinRequest } from "../interface";
import { getSpace } from "./dbActions";

export async function handleJoin(data: JoinPayload) {
  try {
    const { space, user } = await getSpace(data);
    console.log(user, "user is here");
    console.log(space, "is here");

    return {
      type: "join_sucess",
      message: "user joined the server",
    };
  } catch (error) {
    console.log(error);
  }
}

export async function handleMove(payload: any) {
  console.log("handling the move");

  return {
    type: "moving",
    message: "moving in the server",
  };
}
