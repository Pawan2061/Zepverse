import prisma from "@repo/db";

export const getSpace = async (spaceId: string) => {
  try {
    if (!spaceId) {
      return {
        success: false,
        message: "no data available",
      };
    }
    const space = await prisma.space.findUnique({
      where: {
        id: spaceId,
      },
    });

    if (!space) {
      return {
        success: false,
        message: "no space found",
      };
    }
    return {
      success: true,
      message: space,
    };
  } catch (error) {
    return {
      message: error,
    };
  }
};
