import { Userjoinpayload } from "../interface";
export async function handleProcess(payload: Userjoinpayload) {
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
}
