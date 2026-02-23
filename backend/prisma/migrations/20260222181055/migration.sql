/*
  Warnings:

  - A unique constraint covering the columns `[itemId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `capacity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ram` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screen` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "capacity" TEXT NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "fullPrice" INTEGER NOT NULL,
ADD COLUMN     "images" JSONB NOT NULL,
ADD COLUMN     "itemId" TEXT NOT NULL,
ADD COLUMN     "ram" TEXT NOT NULL,
ADD COLUMN     "screen" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_itemId_key" ON "Product"("itemId");
