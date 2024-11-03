import { User } from "../interface";
import { WebSocket } from "ws";

export class SpaceManager {
  spaces: Map<string, User[]> = new Map();
  private xdim = 0;
  private ydim = 0;

  static spaceInstance: SpaceManager;
  private ws: WebSocket | null = null;
  constructor() {
    this.spaces = new Map();
  }
  static getInstance() {
    console.log("new instance");

    if (!this.spaceInstance) {
      this.spaceInstance = new SpaceManager();
    }
    return this.spaceInstance;
  }

  addUserToSpace(user: User, spaceId: string) {
    console.log("inside");

    let existingUsers = this.spaces.get(spaceId) || [];

    existingUsers.push(user);

    this.spaces.set(spaceId, existingUsers);

    return this.spaces.get(spaceId);
  }
}
