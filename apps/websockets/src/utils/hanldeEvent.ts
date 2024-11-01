import WebSocket from "ws";
import { handleProcess } from "./process";

export async function HandleEvent(
  eventType: string,
  payload: any,
  ws: WebSocket
) {
  switch (eventType) {
    case "join":
      const data = await handleProcess(payload);
      ws.send(JSON.stringify(data));
  }
}
