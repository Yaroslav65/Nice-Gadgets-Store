/*
  Warnings:

  - You are about to drop the column `details` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "details";

-- CreateTable
CREATE TABLE "ProductDetails" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "namespaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacityAvailable" JSONB NOT NULL,
    "capacity" TEXT NOT NULL,
    "priceRegular" INTEGER NOT NULL,
    "priceDiscount" INTEGER NOT NULL,
    "colorsAvailable" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "screen" TEXT NOT NULL,
    "resolution" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "camera" TEXT,
    "zoom" TEXT,
    "cell" JSONB NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "ProductDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductDetails_itemId_key" ON "ProductDetails"("itemId");

-- AddForeignKey
ALTER TABLE "ProductDetails" ADD CONSTRAINT "ProductDetails_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Product"("itemId") ON DELETE CASCADE ON UPDATE CASCADE;
