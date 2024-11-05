import { Response, Request } from "express";
import {
  addElementRequestBody,
  SpaceElementRequestBody,
  UpdateElementRequestBody,
} from "../interface/elementInterface";
import prisma from "@repo/db";
import { measureDimensions } from "../utils/checkDimensions";

export const addElement = async (
  req: Request<{}, {}, addElementRequestBody>,
  res: Response
): Promise<any> => {
  try {
    const { imageUrl, width, height, name } = req.body;
    const body = req.body;
    if (!imageUrl || !width || !height || !body) {
      console.log("error here");

      return res.status(403).json({
        message: "insufficient credentials",
      });
    }

    const element = await prisma.element.create({
      data: {
        name: name,
        width: width,
        height: height,
        imageUrl: imageUrl,
        static: body.static,
      },
    });
    if (!element) {
      return res.status(400).json({
        message: "this element is already present",
      });
    }

    return res.status(200).json({
      id: element.id,
      imageUrl: element.imageUrl,
      height: element.height,
      width: element.width,
      static: element.static,
      name: element.name,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: error,
    });
  }
};

export const updateElement = async (
  req: Request<{ elementId: string }, {}, UpdateElementRequestBody>,
  res: Response
): Promise<any> => {
  try {
    const { elementId } = req.params;
    const { imageUrl } = req.body;

    if (!elementId) {
      res.status(404).json({
        message: "credentials not found",
      });
    }
    const element = await prisma.element.findFirst({
      where: {
        id: elementId,
      },
    });
    if (!element) {
      res.status(404).json({
        message: "not found",
      });
    }

    const updatedImage = await prisma.element.update({
      where: {
        id: elementId,
      },
      data: {
        imageUrl: imageUrl,
      },
    });
    res.status(200).json({
      message: `${updatedImage.name} is updated`,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const spaceElement = async (
  req: Request<{}, {}, SpaceElementRequestBody>,
  res: Response
): Promise<any> => {
  try {
    console.log("reached here");

    const { elementId, spaceId, x, y } = req.body;

    // if (!elementId || !spaceId || !x || !y) {
    //   res.status(400).json({
    //     message: "credentials unavailable",
    //   });
    // }

    const existingSpace = await prisma.space.findUnique({
      where: {
        id: spaceId,
      },
    });

    const check = await measureDimensions(x, y, existingSpace!);
    if (!check) {
      return res.status(400).json({
        message: "not allowed to place it",
      });
    }
    if (!existingSpace) {
      return res.status(403).json({
        message: "not allowed to place it",
      });
    }

    const spaceElement = await prisma.spaceElements.create({
      data: {
        elementId: elementId,
        spaceId: spaceId,
        x: x,
        y: y,
      },
    });
    if (!spaceElement) {
      return res.status(404).json({
        message: "this element is unavailable",
      });
    }
    return res.status(200).json({
      spaceElement: spaceElement,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const deleteSpaceElement = async (
  req: Request,
  res: Response
): Promise<any> => {
  console.log("inside delete space lement");

  try {
    const elementId = req.body.id;
    if (!elementId) {
      return res.status(404).json({
        message: "credentials not found",
      });
    }

    const deletedElement = await prisma.spaceElements.delete({
      where: {
        id: elementId,
      },
    });

    return res.status(200).json({
      message: `${deletedElement.elementId} is deleted`,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const getAllElements = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const elements = await prisma.element.findMany();
    if (!elements) {
      return res.status(404).json({
        message: "no elements found",
      });
    }
    return res.status(200).json({
      elements: elements,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
