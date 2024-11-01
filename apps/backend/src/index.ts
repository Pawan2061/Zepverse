import express, { Request, Response } from "express";
import { userRouter } from "./routes/userRoutes";
import dotenv from "dotenv";
import { spaceRouter } from "./routes/spaceRoutes";

dotenv.config();
const app = express();

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("working");
  return;
});

app.use("/api/v1", userRouter);
app.use("/api/v1", spaceRouter);

app.listen(3003, () => {
  console.log("working server");
});
