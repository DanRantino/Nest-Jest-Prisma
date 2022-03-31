-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_paramsId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "paramsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_paramsId_fkey" FOREIGN KEY ("paramsId") REFERENCES "Params"("id") ON DELETE SET NULL ON UPDATE CASCADE;
