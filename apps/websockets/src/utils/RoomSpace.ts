import { User } from "../interface";
import { WebSocket } from "ws";

export class SpaceManager {
  private static instance: SpaceManager;
  spaces: Map<string, User[]>;
  private xdim = 0;
  private ydim = 0;

  private ws: WebSocket | null = null;
  private constructor() {
    console.log("new instance");
    this.spaces = new Map();
  }
  static getInstance() {
    if (!this.instance) {
      console.log("hi pawan");

      SpaceManager.instance = new SpaceManager();
    }
    return SpaceManager.instance;
  }

  addUserToSpace(user: User, spaceId: string) {
    const existingUsers = this.spaces.get(spaceId) || [];

    if (!existingUsers.find((u) => u.id === user.id)) {
      existingUsers.push(user);
      this.spaces.set(spaceId, existingUsers);
    }

    return existingUsers;
  }

  broadCastToUsers(users: User[], spaceId: string) {
    if (!this.spaces.has(spaceId)) {
      return;
    }

    this.spaces.get(spaceId)?.map((user) => {
      this.ws?.send(JSON.stringify(`${user.username} has joined`));
    });
  }
}
