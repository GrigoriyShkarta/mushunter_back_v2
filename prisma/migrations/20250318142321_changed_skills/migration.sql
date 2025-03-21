/*
  Warnings:

  - Made the column `experience` on table `UserSkill` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserSkill" ALTER COLUMN "experience" SET NOT NULL;
