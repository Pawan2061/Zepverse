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
