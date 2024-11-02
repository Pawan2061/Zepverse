import { SpaceDimension } from "../interface/spaceInterface";

export const measureDimensions = async (
  width: number,
  height: number,
  space: SpaceDimension
) => {
  try {
    if (
      width < 0 ||
      height < 0 ||
      width < space.width ||
      height < space.height!
    ) {
      return false;
    }
    return true;
  } catch (error) {}
};
