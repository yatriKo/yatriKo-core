/*
  Warnings:

  - You are about to drop the column `number` on the `Bus` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Hotel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `Bus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `phoneNumber` on the `Hotel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `price` to the `RoomType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `SeatType` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Bus_number_key";

-- AlterTable
ALTER TABLE "Bus" DROP COLUMN "number",
ADD COLUMN     "phoneNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "price",
DROP COLUMN "phoneNumber",
ADD COLUMN     "phoneNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RoomType" ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SeatType" ADD COLUMN     "price" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bus_phoneNumber_key" ON "Bus"("phoneNumber");
