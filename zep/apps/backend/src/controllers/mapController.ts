import prisma from "@repo/db";
import { Request, Response } from "express";
import { CreateAvatar, CreateMap } from "../interface/mapInterface";

export const createMap = async (
  req: Request<{}, {}, CreateMap>,
  res: Response
): Promise<any> => {
  try {
    const { dimensions, thumbnail, name, defaultElements } = req.body;

    const data = JSON.parse(JSON.stringify(req.body));
    console.log(data, "m data i shere");

    if (!dimensions || !thumbnail || !name || !defaultElements) {
      return res.status(404).json({
        message: "credentials are unavailable",
      });
    }

    const [widthStr, heightStr] = dimensions.split("x");

    const map = await prisma.map.create({
      data: {
        name: name,
        thumbnail: thumbnail,
        width: parseInt(widthStr!, 10),
        height: parseInt(heightStr!, 10),

        mapElements: {
          create: defaultElements.map((element) => ({
            x: element.x,
            y: element.y,
            Element: {
              create: {
                name: element.elementId,
                width: 5,
                height: 5,
              },
            },
          })),
        },
      },
      include: {
        mapElements: {
          include: {
            Element: true,
          },
        },
      },
    });
    map.mapElements.map((m) => {
      console.log(m.x);
      console.log(m.elementId);

      console.log(m.y);
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
    console.log(error);

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
