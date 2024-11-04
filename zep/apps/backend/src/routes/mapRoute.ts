import express from "express";
import { checkAdmin, verifyToken } from "../utils/jwt";
import { createMap } from "../controllers/mapController";
export const mapRouter = express.Router();

mapRouter.post("/admin/map", [verifyToken, checkAdmin], createMap);
