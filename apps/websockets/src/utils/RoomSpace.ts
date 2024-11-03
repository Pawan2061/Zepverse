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
    if (!this.spaceInstance) {
      this.spaceInstance = new SpaceManager();
    }
    return this.spaceInstance;
  }

  addUserToSpace(user: User, spaceId: string) {
    console.log("inside");

    if (this.spaces.has(spaceId)) {
      this.spaces.get(spaceId)?.push(user);
    }
    this.spaces.set(spaceId, [user]);
  }
}
