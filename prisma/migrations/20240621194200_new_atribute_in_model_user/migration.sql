/*
  Warnings:

  - Made the column `label` on table `Transaction` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transaction` MODIFY `label` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `age` INTEGER NOT NULL;
