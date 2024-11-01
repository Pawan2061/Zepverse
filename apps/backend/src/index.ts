import express, { Request, Response } from "express";
import { userRouter } from "./routes/userRoutes";
const app = express();

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("working");
  return;
});

app.use("/api/v1", userRouter);

app.listen(3000, () => {
  console.log("working server");
});
