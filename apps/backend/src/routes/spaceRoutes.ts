import express from "express";
import { createSpace, deleteSpace } from "../controllers/spaceController";
export const spaceRouter = express.Router();

spaceRouter.post("/space", createSpace);
spaceRouter.delete("/space/:spaceId", deleteSpace);
