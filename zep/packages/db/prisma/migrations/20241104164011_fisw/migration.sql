/*
  Warnings:

  - You are about to drop the column `static` on the `Map` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Element" ADD COLUMN     "static" BOOLEAN,
ALTER COLUMN "imageUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Map" DROP COLUMN "static";

-- DropEnum
DROP TYPE "Position";
