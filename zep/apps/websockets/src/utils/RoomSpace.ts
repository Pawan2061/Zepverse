// import { Message, User, UsersSocket, WebsocketUser } from "../interface";
// import { WebSocket } from "ws";

// export class SpaceManager {
//   private static instance: SpaceManager;
//   spaces: Map<string, UsersSocket[]>;
//   private connectedUser: User[];
//   // private ws: WebSocket;
//   private constructor() {
//     this.spaces = new Map();
//     this.connectedUser = [];
//   }

//   static getInstance() {
//     if (!this.instance) {
//       SpaceManager.instance = new SpaceManager();
//     }
//     return SpaceManager.instance;
//   }

//   // addUserToSpace(user: User, spaceId: string, ws: WebsocketUser) {
//   //   if (!this.spaces.has(spaceId)) {
//   //     this.spaces.set(spaceId, []);
//   //   }

//   //   const connections = this.spaces.get(spaceId);
//   //   if (connections && !connections.includes(ws)) {
//   //     connections.push(ws);

//   //     console.log(`${user.username} added to space ${spaceId}`);
//   //   }
//   //   this.connectedUser.push(user);

//   //   return connections!.map(({ id, username, x, y }) => ({
//   //     id,
//   //     username,
//   //     x,
//   //     y,
//   //   }));
//   // }
//   addUserToSpace(user: User, spaceId: string, ws: WebSocket) {
//     if (!this.spaces.has(spaceId)) {
//       this.spaces.set(spaceId, []);
//     }
//     const users = this.spaces.get(user.id);

//     if (!users) {
//       return;
//     }

//     const check = users.some((ws) => ws.id === user.id);

//     if (users && !check) {
//       users.push(user);
//     }
//     console.log(users);

//     // if (!this.spaces.has(spaceId)) {
//     //   this.spaces.set(spaceId, []);
//     // }
//     // const connections = this.spaces.get(spaceId);
//     // if (
//     //   connections &&
//     //   !connections.some((connection) => connection.id === ws.id)
//     // ) {
//     //   console.log(ws);
//     //   connections.push(ws.id);
//     // }
//     // if (
//     //   !this.connectedUser.some((connectedUser) => connectedUser.id === user.id)
//     // ) {
//     //   this.connectedUser.push(user);
//     // }
//     // return this.connectedUser;
//   }

//   broadCastToUsers(sender: User, spaceId: string, message: any) {
//     // const connections = this.spaces.get(spaceId);
//     // if (!connections) {
//     //   return;
//     // }
//     // connections.forEach((ws) => {
//     //   ws.send(JSON.stringify(message));
//     // });
//   }

//   removeUserFromSpace(ws: WebsocketUser, spaceId: string) {
//     // const connections = this.spaces.get(spaceId);
//     // if (connections) {
//     //   const index = connections.indexOf(ws);
//     //   if (index !== -1) {
//     //     connections.splice(index, 1);
//     //     ws.close();
//     //     if (connections.length === 0) {
//     //       this.spaces.delete(spaceId);
//     //     }
//     //   }
//     // }
//   }

//   closeServer() {
//     // this.spaces.forEach((connections) => {
//     //   connections.forEach((ws) => ws.close());
//     // });
//     this.spaces.clear();
//   }
// }
