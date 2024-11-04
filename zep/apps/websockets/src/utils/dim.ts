export const getDimension = async (space: any): Promise<object> => {
  try {
    const width = Math.floor(Math.random() * space.width);

    const height = Math.floor(Math.random() * space.height);

    return {
      width: width,
      height: height,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};
