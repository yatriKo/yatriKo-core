-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('DELUXE', 'STANDARD', 'presidental', 'SUITE');

-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('FRONT', 'MIDDLE', 'LAST');

-- CreateTable
CREATE TABLE "HotelOwner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "HotelOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "roomType" "RoomType" NOT NULL DEFAULT 'STANDARD',

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusOwner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BusOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bus" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusSeat" (
    "busId" INTEGER NOT NULL,
    "seatType" "SeatType" NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "BusSeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TravelAgent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,

    CONSTRAINT "TravelAgent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingBus" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "travelerAgentId" INTEGER,
    "busId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "paymentStatus" BOOLEAN NOT NULL,

    CONSTRAINT "BookingBus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingHotel" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER,
    "travelerAgentId" INTEGER,
    "dateFrom" TIMESTAMP(3) NOT NULL,
    "dateTo" TIMESTAMP(3) NOT NULL,
    "paymentStatus" BOOLEAN NOT NULL,

    CONSTRAINT "BookingHotel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HotelOwner_email_key" ON "HotelOwner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Bus_number_key" ON "Bus"("number");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BookingBus_userId_busId_date_key" ON "BookingBus"("userId", "busId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "BookingHotel_userId_roomId_dateFrom_dateTo_key" ON "BookingHotel"("userId", "roomId", "dateFrom", "dateTo");

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "HotelOwner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "BusOwner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusSeat" ADD CONSTRAINT "BusSeat_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingBus" ADD CONSTRAINT "BookingBus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingBus" ADD CONSTRAINT "BookingBus_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingBus" ADD CONSTRAINT "BookingBus_travelerAgentId_fkey" FOREIGN KEY ("travelerAgentId") REFERENCES "TravelAgent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingHotel" ADD CONSTRAINT "BookingHotel_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingHotel" ADD CONSTRAINT "BookingHotel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingHotel" ADD CONSTRAINT "BookingHotel_travelerAgentId_fkey" FOREIGN KEY ("travelerAgentId") REFERENCES "TravelAgent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
