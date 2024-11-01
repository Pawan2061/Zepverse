import express from "express";
import {
  Signup,
  Signin,
  UpdatePic,
  getAvatars,
  getBulkAvatars,
} from "../controllers/userController";
export const userRouter = express.Router();

userRouter.post("/signup", Signup);
userRouter.post("/signin", Signin);
userRouter.post("/user/metadata", UpdatePic);
userRouter.get("/avatars", getAvatars);
userRouter.get("/user/metadata/bulk", getBulkAvatars);
