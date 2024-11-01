import jwt from "jsonwebtoken";
import { JwtPayload } from "../interface/userInterface";

export const createToken = async (payload: JwtPayload) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("jwt not defined");
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN ?? "1500s",
    });
  } catch (error) {}
};
