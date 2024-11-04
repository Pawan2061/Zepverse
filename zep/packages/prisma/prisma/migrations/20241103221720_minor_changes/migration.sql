-- CreateEnum
CREATE TYPE "Position" AS ENUM ('True', 'False');

-- AlterTable
ALTER TABLE "Map" ADD COLUMN     "static" "Position" NOT NULL DEFAULT 'True';
