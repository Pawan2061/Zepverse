import express from "express";
export const spaceRouter = express.Router();
import {
  createSpace,
  deleteSpace,
  getAllSpaces,
  getSpace,
} from "../controllers/spaceController";
spaceRouter.post("/space", createSpace);
spaceRouter.get("/space/:spaceId", getSpace);
spaceRouter.get("/space/all", getAllSpaces);
spaceRouter.delete("/space/spaceId", deleteSpace);
