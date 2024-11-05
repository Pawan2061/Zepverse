import { SpaceDimension } from "../interface/spaceInterface";

export const measureDimensions = async (
  x: number,
  y: number,
  space: SpaceDimension
) => {
  try {
    if (x < 0 || y < 0 || x > space.width || y > space.height!) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);

    return error;
  }
};
