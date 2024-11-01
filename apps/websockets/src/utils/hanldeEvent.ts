import WebSocket from "ws";
import { handleProcess } from "./process";

export async function HandleEvent(
  eventType: string,
  payload: any,
  ws: WebSocket
) {
  switch (eventType) {
    case "join":
      const joinData = await handleProcess(payload);
      return joinData;

    case "move":
      const moveData = await handleProcess(payload);
      return moveData;
  }
}
