import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { elementRouter } from "./routes/elementsRoutes";
import { spaceRouter } from "./routes/spaceRoutes";
import { userRouter } from "./routes/userRoutes";
import { mapRouter } from "./routes/mapRoute";

dotenv.config();
const app = express();

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("working");
  return;
});

app.use("/api/v1", userRouter);
app.use("/api/v1", spaceRouter);
app.use("/api/v1", elementRouter);
app.use("/api/v1", mapRouter);

app.listen(3003, () => {
  console.log("working server");
});
