/*
  Warnings:

  - You are about to drop the column `procriation` on the `Pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "procriation",
ADD COLUMN     "procreation" BOOLEAN NOT NULL DEFAULT false;
