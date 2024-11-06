import prisma from "@repo/db";
import { JoinPayload } from "../interface";
import jwt from "jsonwebtoken";

export const getSpaceAndUser = async (payload: JoinPayload): Promise<any> => {
  try {
    if (!payload.spaceId) {
      return {
        success: false,
        message: "no data available",
      };
    }
    const space = await prisma.space.findFirst({
      where: {
        id: payload.spaceId,
      },
    });

    const user = jwt.verify(payload.token, "pawan1", (err, decoded) => {
      if (err) {
        console.error("JWT verification failed:", err);
        return err;
      }
      return decoded;
    });

    return { space, user };
  } catch (error) {
    return {
      message: error,
    };
  }
};
