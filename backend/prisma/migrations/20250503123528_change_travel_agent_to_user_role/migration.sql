/*
  Warnings:

  - You are about to drop the column `travelerAgentId` on the `BookingBus` table. All the data in the column will be lost.
  - You are about to drop the column `travelerAgentId` on the `BookingHotel` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TravelAgent` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ClientRole" AS ENUM ('User', 'TravelAgent');

-- DropForeignKey
ALTER TABLE "BookingBus" DROP CONSTRAINT "BookingBus_travelerAgentId_fkey";

-- DropForeignKey
ALTER TABLE "BookingHotel" DROP CONSTRAINT "BookingHotel_travelerAgentId_fkey";

-- AlterTable
ALTER TABLE "BookingBus" DROP COLUMN "travelerAgentId",
ADD COLUMN     "clientEmail" TEXT,
ADD COLUMN     "clientName" TEXT;

-- AlterTable
ALTER TABLE "BookingHotel" DROP COLUMN "travelerAgentId",
ADD COLUMN     "clientEmail" TEXT,
ADD COLUMN     "clientName" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Role" "ClientRole" NOT NULL DEFAULT 'User';

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "TravelAgent";
