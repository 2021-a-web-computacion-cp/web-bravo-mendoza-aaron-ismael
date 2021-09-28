-- CreateTable
CREATE TABLE `Planeta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descubrimiento` INTEGER,
    `diametro` DOUBLE NOT NULL,
    `habitado` BOOLEAN NOT NULL,
    `gravedad` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
