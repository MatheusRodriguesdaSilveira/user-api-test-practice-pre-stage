/*
  Warnings:

  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `service_id` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_appointment_id_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_service_id_fkey";

-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "service_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "items";

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
