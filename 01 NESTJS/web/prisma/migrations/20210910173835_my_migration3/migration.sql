/*
  Warnings:

  - You are about to drop the column `apellidos` on the `EPN_USUARIO` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `EPN_USUARIO` DROP COLUMN `apellidos`,
    ADD COLUMN `apellido` VARCHAR(191);
