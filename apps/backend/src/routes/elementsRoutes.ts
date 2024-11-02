import express from "express";
export const elementRouter = express.Router();
import {
  addElement,
  deleteSpaceElement,
  getAllElements,
  spaceElement,
  updateElement,
} from "../controllers/elementController";
import { checkAdmin, verifyToken } from "../utils/jwt";

elementRouter.post("/create/element", [verifyToken, checkAdmin], addElement);
elementRouter.put(
  "/element/:elementId",
  [verifyToken, checkAdmin],
  updateElement
);
elementRouter.post("/space/element", verifyToken, spaceElement);
elementRouter.delete("/space/element/:id", verifyToken, deleteSpaceElement);
elementRouter.get("/elements", getAllElements);
