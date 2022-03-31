/*
  Warnings:

  - Added the required column `timeRequired` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TimeReq" AS ENUM ('QUARTER_HOUR', 'HALF_HOUR', 'TREE_QUARTERS_HOUR', 'HOUR');

-- AlterTable
ALTER TABLE "Calendar" ADD COLUMN     "openDates" TIMESTAMP(3)[],
ADD COLUMN     "reservedDates" TIMESTAMP(3)[],
ADD COLUMN     "timeRequired" "TimeReq" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" DROP NOT NULL;
