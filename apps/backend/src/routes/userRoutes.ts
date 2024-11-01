import express from "express";

import {
  Signup,
  Signin,
  UpdatePic,
  getAvatars,
  getBulkAvatars,
  check,
} from "../controllers/userController";
import { checkAdmin, verifyToken } from "../utils/jwt";
export const userRouter = express.Router();

userRouter.post("/signup", Signup);
userRouter.post("/signin", Signin);
userRouter.post("/user/metadata", verifyToken, UpdatePic);
userRouter.get("/avatars", getAvatars);
userRouter.get("/user/metadata/bulk", verifyToken, getBulkAvatars);
userRouter.get("/info", [verifyToken, checkAdmin], check);
