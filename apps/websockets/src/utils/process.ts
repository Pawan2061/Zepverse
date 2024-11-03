import { JoinPayload, JoinRequest } from "../interface";
import { getSpace } from "./dbActions";

// room --- users
export async function handleJoin(data: JoinPayload) {
  const { message, success } = await getSpace(data.spaceId);

  console.log(message, "it is here");

  if (!success) {
    return {
      message: "no space found",
    };
  }

  return {
    type: "join_sucess",
    message: "user joined the server",
  };
}

export async function handleMove(payload: any) {
  console.log("handling the move");

  return {
    type: "moving",
    message: "moving in the server",
  };
}
