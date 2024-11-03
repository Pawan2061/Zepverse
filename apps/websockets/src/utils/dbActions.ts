import prisma from "@repo/db";
import { JoinPayload } from "../interface";
import jwt from "jsonwebtoken";

export const getSpace = async (payload: JoinPayload) => {
  try {
    if (!payload.spaceId) {
      return {
        success: false,
        message: "no data available",
      };
    }
    const space = await prisma.space.findUnique({
      where: {
        id: payload.spaceId,
      },
    });

    // const [space, user] = await prisma.$transaction([
    //   prisma.user.findFirst({
    //     where: {
    //       id: payload.spaceId,
    //     },
    //   }),
    //   prisma.space.findFirst({
    //     where: {
    //       id: payload.spaceId,
    //     },
    //   }),
    // ]);
    const user = jwt.verify(payload.token, "pawan1", (err, decoded) => {
      if (err) {
        console.error("JWT verification failed:", err);
        return null;
      }
      return decoded;
    });
    console.log(user);

    return { space, user };
  } catch (error) {
    return {
      message: error,
    };
  }
};
