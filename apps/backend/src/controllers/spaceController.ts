import { Request, Response } from "express";
import { SpaceRequestBody } from "../interface/spaceInterface";
import prisma from "@repo/db";
export const createSpace = async (
  req: Request<{}, {}, SpaceRequestBody>,
  res: Response
): Promise<any> => {
  try {
    const { name, dimensions, mapId } = req.body;
    if (!name || !dimensions || !mapId) {
      return res.status(404).json({
        message: "insufficient credentials",
      });
    }

    const [width, height] = dimensions.split("*").map(Number);
    console.log(width);
    console.log(height);

    const newSpace = await prisma.space.create({
      data: {
        name: name,
        height: height,
        // @ts-ignore
        width: width,
      },
    });
    return res.status(200).json({
      spaceId: newSpace.id,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const deleteSpace = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { spaceId } = req.params;
    console.log(spaceId);

    if (!spaceId) {
      return res.status(404).json({
        message: "no spaceid found",
      });
    }
    const deletedSpace = await prisma.space.delete({
      where: {
        id: spaceId,
      },
    });
    return res.status(200).json({
      message: `${deletedSpace.id} is removed`,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const getAllSpaces = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const spaces = await prisma.space.findMany();

    if (!spaces) {
      return res.status(404).json({
        message: "no spaces found",
      });
    }
    return res.status(200).json({
      spaces: spaces,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const getSpace = async (req: Request, res: Response): Promise<any> => {
  try {
    const { spaceId } = req.params;

    if (!spaceId) {
      return res.status(404).json({
        message: "no credentials found",
      });
    }
    const space = await prisma.space.findUnique({
      where: {
        id: spaceId,
      },
    });

    if (!space) {
      return res.status(404).json({
        message: "no space found for such spaceId",
      });
    }
    return res.status(200).json({
      spaces: space,
    });
  } catch (error) {}
};
