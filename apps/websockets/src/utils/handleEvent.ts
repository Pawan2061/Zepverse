import WebSocket from "ws";
import { handleJoin, handleMove } from "./process";
import { JoinPayload } from "../interface";

export async function HandleEvent(
  eventType: string,
  payload: JoinPayload,
  ws: WebSocket
) {
  switch (eventType) {
    case "join":
      const joinData = await handleJoin(payload);
      ws.send(JSON.stringify(joinData));
      return;

    case "move":
      const moveData = await handleMove(payload);
      console.log(moveData, "move data here");
      ws.send(JSON.stringify(moveData));

      return;
  }
}
