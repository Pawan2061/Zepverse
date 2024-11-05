/*
  Warnings:

  - Made the column `elementId` on table `mapElements` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "mapElements" DROP CONSTRAINT "mapElements_elementId_fkey";

-- AlterTable
ALTER TABLE "mapElements" ALTER COLUMN "elementId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Nothing" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Nothing_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "mapElements" ADD CONSTRAINT "mapElements_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Element"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
