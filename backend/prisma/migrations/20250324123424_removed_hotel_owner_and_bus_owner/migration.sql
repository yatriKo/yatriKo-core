/*
  Warnings:

  - You are about to drop the column `busId` on the `BookingBus` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Bus` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the `BusOwner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HotelOwner` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,busSeatId,date]` on the table `BookingBus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `busSeatId` to the `BookingBus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dashboardUserId` to the `Bus` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'HotelOwner', 'BusOwner');

-- DropForeignKey
ALTER TABLE "BookingBus" DROP CONSTRAINT "BookingBus_busId_fkey";

-- DropForeignKey
ALTER TABLE "Bus" DROP CONSTRAINT "Bus_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Hotel" DROP CONSTRAINT "Hotel_ownerId_fkey";

-- DropIndex
DROP INDEX "BookingBus_userId_busId_date_key";

-- AlterTable
ALTER TABLE "BookingBus" DROP COLUMN "busId",
ADD COLUMN     "busSeatId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Bus" DROP COLUMN "ownerId",
ADD COLUMN     "dashboardUserId" INTEGER NOT NULL,
ADD COLUMN     "image" TEXT[];

-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "ownerId",
ADD COLUMN     "dashboardUserId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "image" TEXT[];

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "image" TEXT[];

-- DropTable
DROP TABLE "BusOwner";

-- DropTable
DROP TABLE "HotelOwner";

-- CreateTable
CREATE TABLE "dashboardUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'HotelOwner',

    CONSTRAINT "dashboardUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dashboardUser_email_key" ON "dashboardUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BookingBus_userId_busSeatId_date_key" ON "BookingBus"("userId", "busSeatId", "date");

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_dashboardUserId_fkey" FOREIGN KEY ("dashboardUserId") REFERENCES "dashboardUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_dashboardUserId_fkey" FOREIGN KEY ("dashboardUserId") REFERENCES "dashboardUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingBus" ADD CONSTRAINT "BookingBus_busSeatId_fkey" FOREIGN KEY ("busSeatId") REFERENCES "BusSeat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
