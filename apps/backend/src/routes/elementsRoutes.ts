import express from "express";
export const elementRouter = express.Router();
import { createElement, spaceElement } from "../controllers/elementController";

elementRouter.post("/create/element", createElement);
elementRouter.post("/space/element", spaceElement);
