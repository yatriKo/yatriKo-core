/*
  Warnings:

  - Added the required column `password` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `BusOwner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `HotelOwner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `TravelAgent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BusOwner" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HotelOwner" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TravelAgent" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;
