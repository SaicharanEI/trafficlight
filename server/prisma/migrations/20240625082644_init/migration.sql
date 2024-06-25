-- AlterTable
ALTER TABLE `trafficlight` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `trafficlightschedule` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;
