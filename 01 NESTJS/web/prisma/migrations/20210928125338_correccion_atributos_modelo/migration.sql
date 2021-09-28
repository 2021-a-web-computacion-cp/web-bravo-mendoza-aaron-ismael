/*
  Warnings:

  - You are about to alter the column `diametro` on the `Planeta` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `gravedad` on the `Planeta` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Planeta` MODIFY `diametro` DOUBLE NOT NULL,
    MODIFY `habitado` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `gravedad` DOUBLE NOT NULL;
