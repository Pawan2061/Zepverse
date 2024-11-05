import { Message, User, WebsocketUser } from "../interface";
import { WebSocket } from "ws";

export class SpaceManager {
  private static instance: SpaceManager;
  spaces: Map<string, WebsocketUser[]>;
  private connectedUser: User[];
  private constructor() {
    this.spaces = new Map();
    this.connectedUser = [];
  }

  static getInstance() {
    if (!this.instance) {
      SpaceManager.instance = new SpaceManager();
    }
    return SpaceManager.instance;
  }

  addUserToSpace(user: User, spaceId: string, ws: WebsocketUser) {
    if (!this.spaces.has(spaceId)) {
      this.spaces.set(spaceId, []);
    }

    const connections = this.spaces.get(spaceId);
    if (connections && !connections.includes(ws)) {
      connections.push(ws);

      console.log(`${user.username} added to space ${spaceId}`);
    }
    this.connectedUser.push(user);

    return this.connectedUser;
  }

  broadCastToUsers(sender: User, spaceId: string, message: any) {
    const connections = this.spaces.get(spaceId);
    if (!connections) {
      return;
    }

    console.log("Broadcasting inside the space");
    console.log(message.data);

    connections.forEach((ws) => {
      ws.send(JSON.stringify(message));
    });
  }

  removeUserFromSpace(ws: WebsocketUser, spaceId: string) {
    const connections = this.spaces.get(spaceId);
    if (connections) {
      const index = connections.indexOf(ws);
      if (index !== -1) {
        connections.splice(index, 1);
        ws.close();
        console.log(`WebSocket connection removed from space ${spaceId}`);

        if (connections.length === 0) {
          this.spaces.delete(spaceId);
        }
      }
    }
  }

  closeServer() {
    this.spaces.forEach((connections) => {
      connections.forEach((ws) => ws.close());
    });
    this.spaces.clear();
  }
}
