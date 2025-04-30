/*
  Warnings:

  - You are about to drop the column `count` on the `BusSeat` table. All the data in the column will be lost.
  - You are about to drop the column `seatTypeId` on the `BusSeat` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfRooms` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `roomTypeId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the `RoomType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SeatType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `BusSeat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatType` to the `BusSeat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BusSeat" DROP CONSTRAINT "BusSeat_seatTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_roomTypeId_fkey";

-- AlterTable
ALTER TABLE "BusSeat" DROP COLUMN "count",
DROP COLUMN "seatTypeId",
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "seatType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "numberOfRooms",
DROP COLUMN "roomTypeId",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "roomType" TEXT NOT NULL DEFAULT 'Standard';

-- DropTable
DROP TABLE "RoomType";

-- DropTable
DROP TABLE "SeatType";
