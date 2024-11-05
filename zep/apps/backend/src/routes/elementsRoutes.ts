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
import { deleteSpace } from "../controllers/spaceController";

elementRouter.post("/admin/element", [verifyToken, checkAdmin], addElement);
elementRouter.put(
  "/admin/element/:elementId",
  [verifyToken, checkAdmin],
  updateElement
);

elementRouter.post("/space/element", verifyToken, spaceElement);
elementRouter.delete("/space/element", verifyToken, deleteSpaceElement);

elementRouter.get("/elements", getAllElements);

elementRouter.delete("/space/:spaceId", verifyToken, deleteSpace);
