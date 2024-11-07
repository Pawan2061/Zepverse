import { WebSocketServer } from "ws";
import {
  LeaveType,
  MovementDone,
  MovementRejected,
  MovePayload,
  Mysocket,
  UsersSocket,
} from "./interface";
import { JoinPayload, Message, UserJoinMessage } from "./interface";
import { getSpaceAndUser } from "./utils/dbActions";

let spaces = new Map<string, Mysocket[]>();

const wss = new WebSocketServer({
  port: 8080,
});

// const wss = new WebSocketServer({
//   server: httpServer,
// });

async function handleJoin(data: JoinPayload, ws: Mysocket) {
  const { user, space } = await getSpaceAndUser(data);

  if (!user || !space) {
    throw new Error("invalid credentials");
  }

  if (!spaces.has(data.spaceId)) {
    spaces.set(data.spaceId, []);
  }

  ws.userId = user.id;
  ws.spaceId = data.spaceId;
  const spaceUsers = spaces.get(data.spaceId);
  const check = spaceUsers?.some((su) => su.userId === user.id);

  const x = Math.floor(Math.random() * space.width);
  const y = Math.floor(Math.random() * space.height);

  ws.x = x;
  ws.y = y;

  if (spaceUsers && !check) {
    spaceUsers.push(ws);
  }
  const userId = user.id;
  console.log(spaces.get(space.id));

  const message: Message = {
    type: "space-joined",
    payload: {
      spawn: {
        x: x,
        y: y,
      },
      users: spaces
        .get(space.id)
        ?.filter((x) => x.userId !== user.id)
        .map((u) => ({ id: userId })),
    },
  };

  const userjoin: UserJoinMessage = {
    type: "user-joined",
    payload: {
      x: x,
      y: y,
      userId: userId,
    },
  };

  ws.send(JSON.stringify(message));

  spaces.get(space.id)?.forEach((ws) => {
    if (ws.userId !== user.id) {
      ws.send(JSON.stringify(userjoin));
    }
  });
}

async function Check(
  ws: Mysocket,
  xMovement: number,
  yMovement: number
): Promise<any> {
  const check = spaces.get(ws.spaceId)?.some((ws) => {
    if (ws.x == xMovement && ws.y == yMovement) {
      return false;
    }
    return true;
  });
}

async function handleMove(data: MovePayload, ws: Mysocket) {
  console.log(ws, "im here");
  console.log(data.x);
  console.log(data.y);

  const xMovement = data.x;

  const yMovement = data.y;

  const xDistance = Math.abs(xMovement - ws.x!);
  const yDistance = Math.abs(yMovement - ws.y!);

  const check = await Check(ws, xMovement, yMovement);
  console.log(xDistance, yDistance);

  if (
    (xDistance == 0 && yDistance == 1) ||
    (yDistance == 0 && xDistance == 1)
  ) {
    const message: MovementDone = {
      type: "movement",
      payload: {
        x: xMovement,
        y: yMovement,
        userId: ws.userId!,
      },
    };
    ws.x = xMovement;
    ws.y = yMovement;

    console.log("successfull");

    spaces.get(ws.spaceId)?.forEach((ws) => {
      ws.send(JSON.stringify(message));
    });

    return;
  }

  const message: MovementRejected = {
    type: "movement-rejected",
    payload: {
      x: ws.x!,
      y: ws.y!,
    },
  };

  ws.send(JSON.stringify(message));
}

async function handleClose(ws: Mysocket) {
  const message: LeaveType = {
    type: "user-left",
    payload: {
      userId: ws.userId!,
    },
  };
  const existingUsers = spaces.get(ws.spaceId);
  if (existingUsers) {
    const finalUsers = existingUsers.filter((u) => u.userId !== ws.userId);
    if (finalUsers.length > 0) {
      spaces.set(ws.spaceId, finalUsers);
    } else {
      spaces.delete(ws.spaceId);
    }

    spaces.delete(ws.userId!);

    finalUsers.forEach((user) => {
      user.send(JSON.stringify(message));
    });
  }
}
wss.on("connection", async (ws: Mysocket) => {
  ws.on("message", async (message) => {
    const data = JSON.parse(message.toString());

    const { type } = data;

    switch (type) {
      case "join":
        handleJoin(data.payload, ws);
        break;

      case "move":
        handleMove(data.payload, ws);
        break;
    }
  });

  ws.on("close", async (ws: Mysocket) => {
    const message: LeaveType = {
      type: "user-left",
      payload: {
        userId: ws.userId!,
      },
    };

    if (!ws.spaceId) {
      return;
    } else {
      const space_users = spaces.get(ws.spaceId);
      const newUsers = space_users?.filter((u) => u.userId !== ws.userId);
      spaces.delete(ws.userId!);
      spaces.get(ws.spaceId)?.forEach((client) => {
        client.send(JSON.stringify(message));
      });
    }
  });

  ws.on("close", async () => {
    handleClose(ws);
  });
});
