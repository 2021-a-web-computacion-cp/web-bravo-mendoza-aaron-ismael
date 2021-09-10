/*
  Warnings:

  - You are about to drop the column `apellido` on the `EPN_USUARIO` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `EPN_USUARIO` DROP COLUMN `apellido`,
    ADD COLUMN `apellidos` VARCHAR(191);
