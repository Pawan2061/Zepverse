/*
  Warnings:

  - A unique constraint covering the columns `[elementId]` on the table `spaceElements` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Element" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'unnamed';

-- CreateIndex
CREATE UNIQUE INDEX "spaceElements_elementId_key" ON "spaceElements"("elementId");
