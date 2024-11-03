import { Request, Response } from "express";
import { HashPassword } from "../utils/hashPassword";
import { createToken } from "../utils/jwt";
import prisma from "@repo/db";
import {
  JwtPayload,
  SigninBody,
  SignupRequestBody,
  UpdatePicRequest,
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
        role: type,
      },
    });

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
    console.log("cbecking is done");

    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      password: user.password,
    };

    const token = await createToken(payload);
    console.log(token, "is here guys");

    return res.status(200).json({ token: token });
  } catch (erorr) {
    return res.status(403).send("user couldnt be signed in");
  }
};
export const UpdatePic = async (
  req: UpdatePicRequest,
  res: any
): Promise<any> => {
  try {
    const { avatarId } = req.body;
    const username = req.user.username;
    const id = req.user;
    if (!avatarId) {
      return res.status(404).json({
        message: "insufficient credentials",
      });
    }
    const check = await prisma.avatar.findUnique({
      where: {
        id: avatarId,
      },
    });
    if (!check) {
      return res.status(404).json({
        message: "no such avatar found",
      });
    }

    const user = await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        avatarId: avatarId,
      },
    });

    return res.status(200).json({
      message: `avatar ${user.avatarId} is created`,
    });
  } catch (error) {
    return res.status(403).json({
      error: error,
    });
  }
};

export const getAvatars = async (req: Request, res: Response): Promise<any> => {
  try {
    const avatars = await prisma.avatar.findMany();
    if (!avatars) {
      return res.status(404).json({
        message: "no avatars found",
      });
    }

    res.status(200).json({
      avatars: avatars,
    });
    return;
  } catch (error) {
    return res.status(403).send("user couldnt be signed in");
  }
};

export const getBulkAvatars = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const idsParam: any = req.query.ids;

    if (idsParam) {
      const params = idsParam
        .replace(/[\[\]"]/g, "")
        .split(",")
        .map((id: string) => id.trim());

      console.log(idsParam, "new ids");

      try {
        const userMetadata = await prisma.user.findMany({
          where: {
            id: { in: params },
          },
          select: {
            id: true,

            avatar: true,
          },
        });
        return res.status(200).json({ avatars: userMetadata });
      } catch (error) {
        console.log(error);
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "No IDs provided." });
    }
  } catch (error) {
    return res.status(403).json({
      message: "couldnt find the associated avatars",
    });
  }
};

export const check = async (req: any, res: any) => {
  try {
    return res.status(200).json({
      message: "eifneifm",
    });
  } catch (error) {
    return res.status(403).json({
      message: "couldnt find the associated avatars",
    });
  }
};
