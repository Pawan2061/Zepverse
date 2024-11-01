import { Response, Request } from "express";
import {
  addElementRequestBody,
  SpaceElementRequestBody,
} from "../interface/elementInterface";
import prisma from "@repo/db";
export const addElement = async (
  req: Request<{}, {}, addElementRequestBody>,
  res: Response
): Promise<any> => {
  try {
    const { elementId, spaceId, x, y } = req.body;
    if (!elementId || !spaceId || !x || !y) {
      console.log("error here");

      return res.status(404).json({
        message: "insufficient credentials",
      });
    }
    // const element = await prisma.element.create({
    //   data: {
    //     height: height,
    //     width: width,
    //     imageUrl: imageUrl,
    //     name: name,
    //   },
    // });
    // if (!element) {
    //   return res.status(400).json({
    //     message: "element is not created",
    //   });
    // }
    const element = await prisma.spaceElements.findUnique({
      where: {
        elementId: elementId,
      },
    });
    if (!element) {
      return res.status(400).json({
        message: "this element is already present",
      });
    }
    const newElement = await prisma.spaceElements.create({
      data: {
        elementId: elementId,
        spaceId: spaceId,
        x: x,
        y: y,
      },
    });

    return res.status(200).json({
      element: newElement,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
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
    console.log(req.body);

    if (!elementId || !spaceId || !x || !y) {
      return res.status(404).json({
        message: "credentials unavailable",
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
  try {
    const elementId = req.params.id;
    if (!elementId) {
      return res.status(404).json({
        message: "credentials not found",
      });
    }

    const deletedElement = await prisma.spaceElements.delete({
      where: {
        elementId: elementId,
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
