/*
  Warnings:

  - You are about to drop the column `age` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `birthdate` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "age",
ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL;
