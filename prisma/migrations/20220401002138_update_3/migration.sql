/*
  Warnings:

  - Changed the type of `title` on the `Calendar` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Months" AS ENUM ('JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER');

-- AlterTable
ALTER TABLE "Calendar" ADD COLUMN     "month" INTEGER,
ADD COLUMN     "year" INTEGER,
DROP COLUMN "title",
ADD COLUMN     "title" "Months" NOT NULL;
