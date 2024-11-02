export async function handleJoin(payload: any) {
  return {
    type: "join_sucess",
    message: "user joined the server",
  };
}
export async function handleMove(payload: any) {
  return {
    type: "moving",
    message: "moving in the server",
  };
  console.log(payload);
}
