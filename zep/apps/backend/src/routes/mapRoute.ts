import express from "express";
import { checkAdmin, verifyToken } from "../utils/jwt";
import { createAvatar, createMap } from "../controllers/mapController";
export const mapRouter = express.Router();

mapRouter.post("/admin/map", [verifyToken, checkAdmin], createMap);
mapRouter.post("/admin/avatar", [verifyToken, checkAdmin], createAvatar);
