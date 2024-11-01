import { Request, Response } from "express";
import { HashPassword } from "../utils/hashPassword";
import { createToken } from "../utils/jwt";
import prisma from "@repo/db";
import {
  JwtPayload,
  SigninBody,
  SignupRequestBody,
} from "../interface/userInterface";
import bcrypt, { hash } from "bcrypt";

export const Signup = async (
  req: Request<{}, {}, SignupRequestBody>,
  res: Response
): Promise<any> => {
  try {
    const { username, type, password } = req.body;
    console.log(type);

    if (!username || !type || !password) {
      return res.status(404).json({
        message: "insufficient credentials",
      });
    }
    const hashedPassword = await HashPassword(password);

    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    console.log("reached here");

    console.log(user);

    return res.status(200).json({
      userId: user.id,
    });
  } catch (error) {
    return res.status(400).send("user couldnt be created");
  }
};

export const Signin = async (
  req: Request<{}, {}, SigninBody>,
  res: Response
): Promise<any> => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(404).json({
        message: "insufficient credentials",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "no such user found",
      });
    }
    const check = await bcrypt.compare(password, user?.password);

    if (!check) {
      return res.status(403).json({
        message: "unmatched password",
      });
    }

    const payload: JwtPayload = {
      username: user.username,
      password: user.password,
    };

    const token = await createToken(payload);

    return res.status(200).json({ token: token });
  } catch (erorr) {
    return res.status(403).send("user couldnt be signed in");
  }
};
