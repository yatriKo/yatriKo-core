/*
  Warnings:

  - You are about to drop the column `roomNumber` on the `Room` table. All the data in the column will be lost.
  - Added the required column `count` to the `BusSeat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfRooms` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusSeat" ADD COLUMN     "count" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "roomNumber",
ADD COLUMN     "numberOfRooms" INTEGER NOT NULL;
