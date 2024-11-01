import express from "express";
export const elementRouter = express.Router();
import {
  addElement,
  deleteSpaceElement,
  getAllElements,
  spaceElement,
} from "../controllers/elementController";
import { verifyToken } from "../utils/jwt";

elementRouter.post("/create/element", verifyToken, addElement);
elementRouter.post("/space/element", verifyToken, spaceElement);
elementRouter.delete("/space/element/:id", verifyToken, deleteSpaceElement);
elementRouter.get("/elements", getAllElements);
