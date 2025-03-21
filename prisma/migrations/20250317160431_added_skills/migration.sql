/*
  Warnings:

  - You are about to drop the `Profession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProfessionToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProfessionToUser" DROP CONSTRAINT "_ProfessionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfessionToUser" DROP CONSTRAINT "_ProfessionToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "skillId" INTEGER;

-- DropTable
DROP TABLE "Profession";

-- DropTable
DROP TABLE "_ProfessionToUser";

-- CreateTable
CREATE TABLE "UserSkill" (
    "user_id" TEXT NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "experience" INTEGER,

    CONSTRAINT "UserSkill_pkey" PRIMARY KEY ("user_id","skill_id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserSkill" ADD CONSTRAINT "UserSkill_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkill" ADD CONSTRAINT "UserSkill_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
