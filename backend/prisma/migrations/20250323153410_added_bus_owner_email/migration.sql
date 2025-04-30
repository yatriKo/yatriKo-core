/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `BusOwner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `BusOwner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusOwner" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BusOwner_email_key" ON "BusOwner"("email");
