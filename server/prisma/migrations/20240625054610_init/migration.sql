-- CreateTable
CREATE TABLE `TrafficLight` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `currentColor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrafficLightSchedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timePeriod` VARCHAR(191) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `redDuration` INTEGER NOT NULL,
    `yellowDuration` INTEGER NOT NULL,
    `greenDuration` INTEGER NOT NULL,
    `trafficLightId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TrafficLightSchedule` ADD CONSTRAINT `TrafficLightSchedule_trafficLightId_fkey` FOREIGN KEY (`trafficLightId`) REFERENCES `TrafficLight`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
