import { Request, Response } from "express";
import { SpaceRequestBody } from "../interface/spaceInterface";
import prisma from "@repo/db";
export const createSpace = async (
  req: SpaceRequestBody,
  res: any
): Promise<any> => {
  try {
    const { name, dimensions, mapId } = req.body;
    if (!name || !dimensions || !mapId) {
      res.status(404).json({
        message: "insufficient credentials",
      });
      return;
    }

    const [width, height] = dimensions.split("*").map(Number);
    if (!mapId) {
      const newSpace = await prisma.space.create({
        data: {
          name: name,
          height: height,
          // @ts-ignore
          width: width,
        },
      });
      res.status(200).json({
        spaceId: newSpace.id,
      });
      return;
    }
    const map = await prisma.map.findFirst({
      where: {
        id: mapId,
      },
      select: {
        mapElements: true,
        width: true,
        height: true,
      },
    });
    if (!map) {
      res.status(404).json({
        message: "map not found",
      });
      return;
    }

    let space = await prisma.$transaction(async () => {
      const space = await prisma.space.create({
        data: {
          name: name,
          width: map.width,
          height: map.height,
          userId: req.user.id,
        },
      });
      await prisma.spaceElements.createMany({
        data: map.mapElements.map((m) => ({
          elementId: m.id,
          spaceId: space.id,
          x: m.x!,
          y: m.y!,
        })),
      });
      return space;
    });

    res.status(200).json({
      spaceId: space.id,
    });
    return;
  } catch (error) {
    res.status(400).json({
      message: error,
    });
    return;
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
      include: {
        elements: {
          include: {
            element: true,
          },
        },
      },
    });

    if (!space) {
      return res.status(404).json({
        message: "no space found for such spaceId",
      });
    }

    return res.status(200).json({
      dimensions: `${space.width}x${space.height}`,
      spaceElements: space.elements,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};