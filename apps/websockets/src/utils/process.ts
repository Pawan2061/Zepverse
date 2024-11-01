import { Userjoinpayload } from "../interface";
export async function handleProcess(payload: Userjoinpayload) {
  switch (payload.type) {
    case "join":
      return {
        type: "space-joined",
        payload: {
          spawn: {
            x: 3,
            y: 4,
          },
          users: [
            {
              id: 1,
            },
          ],
        },
      };

    case "move":
      return {
        type: "movement",
        payload: {
          x: 1,
          y: 2,
          userId: "123",
        },
      };
  }
}
