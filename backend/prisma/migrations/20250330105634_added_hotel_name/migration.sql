/*
  Warnings:

  - Added the required column `busNumber` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bus" ADD COLUMN     "busNumber" TEXT NOT NULL,
ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;
