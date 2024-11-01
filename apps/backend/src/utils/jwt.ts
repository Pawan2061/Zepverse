import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "../interface/userInterface";
import prisma from "@repo/db";

export const createToken = async (payload: JwtPayload) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("jwt not defined");
    }
    console.log("creating a token");

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN ?? "1500s",
    });
  } catch (error) {
    return error;
  }
};
export const verifyToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log(token, "token is here");

  if (!token) {
    res.status(401).json({
      error: "unauthorized",
    });
    return;
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, decodedToken: any) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      console.log("authenticated");

      req.user = decodedToken;
      next();
    }
  );
};

export const checkAdmin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  console.log("checking");

  const user = await prisma.user.findUnique({
    where: {
      username: req.user.username,
    },
  });
  console.log(user, "is here");

  if (user?.role != "Admin") {
    res.status(200).json({ msg: "No sufficient credentials" });
    return;
  }
  console.log("he is the admin");

  next();
  console.log("after");
};
