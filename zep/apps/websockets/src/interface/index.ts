import WebSocket from "ws";
export interface Userjoinpayload {
  type: string;
  payload: {
    spaceId: string;
    token: string;
  };
}

export interface JoinRequest {
  type: "join";
  payload: {
    spaceId: string;
    token: string;
  };
}

export interface JoinPayload {
  spaceId: string;
  token: string;
}

export interface User {
  y: any;
  x: any;
  id: string;
  username: string;
}

export interface Dimension {
  width: number;
  height: number;
}

interface Spawn {
  x: number;
  y: number;
}

interface MessagePayload {
  spawn: Spawn;
  users: Map<string, WebSocket>;
}

// export interface Message {
//   type: string;
//   payload: MessagePayload;
// }

export interface Sid {
  ws: WebSocket;
  user: User;
}
export type Message = {
  type: string;
  payload: {
    spawn: { x: number; y: number };
    users: Map<string, WebSocket> | undefined; // Allow undefined
  };
};

export interface WebsocketUser extends WebSocket {
  id: string;
  username: string;
  password: string;
  x: number;
  y: number;
}

export interface WebsocketUsers extends WebSocket {
  id: string;
  username: string;
  password: string;
  x: number;
  y: number;
}
