-- DropForeignKey
ALTER TABLE "Hotel" DROP CONSTRAINT "Hotel_dashboardUserId_fkey";

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_dashboardUserId_fkey" FOREIGN KEY ("dashboardUserId") REFERENCES "dashboardUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
