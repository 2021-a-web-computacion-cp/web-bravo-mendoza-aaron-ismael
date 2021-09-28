-- AlterTable
ALTER TABLE `Planeta` MODIFY `diametro` FLOAT NOT NULL,
    ALTER COLUMN `habitado` DROP DEFAULT,
    MODIFY `gravedad` FLOAT NOT NULL;
