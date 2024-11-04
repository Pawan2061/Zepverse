import prisma from "@repo/db";
import { Request, Response } from "express";
import { CreateAvatar, CreateMap } from "../interface/mapInterface";

export const createMap = async (
  req: Request<{}, {}, CreateMap>,
  res: Response
): Promise<any> => {
  try {
    const { dimensions, thumbnail, name, defaultElements } = req.body;
    if (!dimensions || !thumbnail || !name || !defaultElements) {
      return res.status(404).json({
        message: "credentials are unavailable",
      });
    }
    const [widthStr, heightStr] = dimensions.split("x");
    console.log("reaching here");
    console.log(defaultElements);

    console.log(
      defaultElements.map((df) => {
        console.log(df.id);
      })
    );

    const map = await prisma.map.create({
      data: {
        name: name,
        thumbnail: thumbnail,
        width: parseInt(widthStr!, 10),
        height: parseInt(heightStr!, 10),

        mapElements: {
          create: defaultElements.map((element) => ({
            elementId: element.id,
            x: element.x,
            y: element.y,
          })),
        },
      },
      include: {
        mapElements: true,
      },
    });

    if (!map) {
      return res.status(404).json({
        message: "map couldnot be formed",
      });
    }
    return res.status(200).json({
      id: map.id,
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

export const createAvatar = async (
  req: Request<{}, {}, CreateAvatar>,
  res: Response
): Promise<any> => {
  try {
    const { imageUrl, name } = req.body;
    if (!name || !imageUrl) {
      return res.status(400).json({
        message: "no avatar found",
      });
    }
    console.log("creatinga avaatar");

    const avatar = await prisma.avatar.create({
      data: {
        imageUrl: imageUrl,
        name: name,
      },
    });
    console.log(avatar, "is made");

    return res.status(200).json({
      avatarId: avatar.id,
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};
