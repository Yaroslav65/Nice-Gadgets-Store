/*
  Warnings:

  - The `colorsAvailable` column on the `ProductDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProductDetails" DROP COLUMN "colorsAvailable",
ADD COLUMN     "colorsAvailable" TEXT[];
