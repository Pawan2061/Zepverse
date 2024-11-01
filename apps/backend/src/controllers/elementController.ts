import { Response, Request } from "express";
import {
  ElementRequestBody,
  SpaceElementRequestBody,
} from "../interface/elementInterface";
import prisma from "@repo/db";
export const createElement = async (
  req: Request<{}, {}, ElementRequestBody>,
  res: Response
): Promise<any> => {
  try {
    const { width, height, imageUrl, name } = req.body;
    if (!width || !height || !imageUrl) {
      console.log("error here");

      return res.status(404).json({
        message: "insufficient credentials",
      });
    }
    const element = await prisma.element.create({
      data: {
        height: height,
        width: width,
        imageUrl: imageUrl,
        name: name,
      },
    });
    if (!element) {
      return res.status(400).json({
        message: "element is not created",
      });
    }
    return res.status(200).json({
      element: element,
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
