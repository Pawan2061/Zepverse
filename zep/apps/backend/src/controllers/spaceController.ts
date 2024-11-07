import { Request, Response } from "express";
import { SpaceRequestBody } from "../interface/spaceInterface";
import prisma from "@repo/db";
export const createSpace = async (
  req: SpaceRequestBody,
  res: any
): Promise<any> => {
  try {
    const { name, dimensions, mapId } = req.body;
    if (!name || !dimensions) {
      res.status(400).json({
        message: "insufficient credentials",
      });
      return;
    }
    const id = req.user.id;

    const [width, height] = dimensions.split("x").map(Number);
    if (!mapId) {
      const newSpace = await prisma.space.create({
        data: {
          name: name,
          height: height,
          width: width,
          userId: id,
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
    console.log(map, "my mapo i shere bro");

    if (!map) {
      res.status(400).json({
        message: "map not found",
      });
      return;
    }

    // let space = await prisma.$transaction(async () => {
    //   const space = await prisma.space.create({
    //     data: {
    //       name: name,
    //       width: map.width,
    //       height: map.height,
    //       userId: req.user.id,
    //     },
    //   });

    //   await prisma.spaceElements.createMany({
    //     data: map.mapElements.map((m) => ({
    //       elementId: m.id,
    //       spaceId: space.id,
    //       x: m.x!,
    //       y: m.y!,
    //     })),
    //   });

    //   await prisma.spaceElements.createMany({
    //     data: map.mapElements.map((m) => ({
    //       elementId: m.id,

    //       spaceId: space.id,
    //       x: m.x!,
    //       y: m.y!,
    //     })),
    //   });
    //   return space;
    // });

    // res.status(200).json({
    //   spaceId: space.id,
    // });
    let space = await prisma.$transaction(async () => {
      // Create the new Space
      const space = await prisma.space.create({
        data: {
          name: name,
          width: width,
          height: height,
          userId: req.user.id,
        },
      });

      console.log(map.mapElements);

      await prisma.spaceElements.createMany({
        data: map.mapElements
          .map((e: any) => ({
            spaceId: space.id,
            elementId: e.elementId!,
            x: e.x!,
            y: e.y!,
          }))
          .filter((item: any) => item.elementId !== null),
      });

      return space;
    });

    res.status(200).json({
      spaceId: space.id,
    });
    return;
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error,
    });
    return;
  }
};

export const deleteSpace = async (req: any, res: Response): Promise<any> => {
  try {
    const { spaceId } = req.params;
    console.log(spaceId);

    if (!spaceId) {
      return res.status(400).json({
        message: "no spaceid found",
      });
    }
    const spaceCheck = await prisma.space.findUnique({
      where: {
        id: spaceId,
      },
    });

    if (!spaceCheck) {
      return res.status(400).json({
        message: "not found",
      });
    }
    console.log("inside spacedelete ");

    if (spaceCheck?.userId != req.user.id) {
      return res.status(403).json({
        message: "user not matched",
      });
    }
    const deletedSpace = await prisma.space.delete({
      where: {
        id: spaceId,
      },
      include: {
        elements: true,
      },
    });
    return res.status(200).json({
      message: `${deletedSpace.id} is removed`,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: error,
    });
  }
};

export const getAllSpaces = async (req: any, res: Response): Promise<any> => {
  console.log("owfjne");

  try {
    console.log("yo yo im here lets check");

    const spaces = await prisma.space.findMany({
      where: {
        userId: req.user.id,
      },
    });

    if (!spaces) {
      return res.status(404).json({
        message: "no spaces found",
      });
    }
    return res.status(200).json({
      spaces: spaces.map((s: any) => ({
        id: s.id,
        name: s.name,
        thumbnail: s.thumbnail,
        dimensions: `${s.width}x${s.height}`,
      })),
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: error,
    });
  }
};

export const getSpace = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("going to th enext space thing");

    const { spaceId } = req.params;

    if (!spaceId) {
      return res.status(400).json({
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
      return res.status(400).json({
        spaces: [],
      });
    }

    console.log(space, "bfiuebfneiofdneoiwdnfbebuj");

    return res.status(200).json({
      dimensions: `${space.width}x${space.height}`,
      elements: space.elements.map((m: any) => ({
        id: m.id,
        x: m.x,
        y: m.y,
      })),
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
