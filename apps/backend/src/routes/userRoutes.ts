import express from "express";
import { Signup, Signin } from "../controllers/userController";
export const userRouter = express.Router();

userRouter.post("/signup", Signup);
userRouter.post("/signin", Signin);
