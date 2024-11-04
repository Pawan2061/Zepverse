import express from "express";
export const spaceRouter = express.Router();
import {
  createSpace,
  deleteSpace,
  getAllSpaces,
  getSpace,
} from "../controllers/spaceController";
import { verifyToken } from "../utils/jwt";
spaceRouter.post("/space", verifyToken, createSpace);
spaceRouter.get("/space/all", verifyToken, getAllSpaces);
spaceRouter.get("/space/:spaceId", getSpace);

spaceRouter.delete("/space/:spaceId", verifyToken, deleteSpace);
