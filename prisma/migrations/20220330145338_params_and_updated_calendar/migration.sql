/*
  Warnings:

  - Added the required column `paramsId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "paramsId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Params" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "openTime" INTEGER NOT NULL,
    "closeTime" INTEGER NOT NULL,

    CONSTRAINT "Params_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_paramsId_fkey" FOREIGN KEY ("paramsId") REFERENCES "Params"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
