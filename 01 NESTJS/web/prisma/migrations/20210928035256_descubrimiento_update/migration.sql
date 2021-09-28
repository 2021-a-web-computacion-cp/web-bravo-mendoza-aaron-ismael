/*
  Warnings:

  - Made the column `descubrimiento` on table `Planeta` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Planeta` MODIFY `descubrimiento` INTEGER NOT NULL;
