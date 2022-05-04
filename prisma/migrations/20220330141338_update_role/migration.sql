-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'FUNCTIONARY');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'USER';
