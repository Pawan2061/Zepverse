import WebSocket from "ws";
import { handleJoin, handleMove } from "./process";

export async function HandleEvent(
  eventType: string,
  payload: any,
  ws: WebSocket
) {
  switch (eventType) {
    case "join":
      const joinData = await handleJoin(payload);
      console.log(joinData, "join data here");

      return joinData;

    case "move":
      const moveData = await handleMove(payload);
      console.log(moveData, "move data here");

      return moveData;
  }
}
