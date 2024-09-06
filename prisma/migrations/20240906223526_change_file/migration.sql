/*
  Warnings:

  - Added the required column `originalname` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "originalname" VARCHAR(260) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(300);
