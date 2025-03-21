-- AlterTable
ALTER TABLE "User" ADD COLUMN     "inSearchBandId" INTEGER;

-- CreateTable
CREATE TABLE "InSearchBand" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "InSearchBand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InSearchMusician" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "InSearchMusician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InSearchBandToStyle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_InSearchBandToStyle_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "InSearchBand_user_id_key" ON "InSearchBand"("user_id");

-- CreateIndex
CREATE INDEX "_InSearchBandToStyle_B_index" ON "_InSearchBandToStyle"("B");

-- AddForeignKey
ALTER TABLE "InSearchBand" ADD CONSTRAINT "InSearchBand_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InSearchMusician" ADD CONSTRAINT "InSearchMusician_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InSearchBandToStyle" ADD CONSTRAINT "_InSearchBandToStyle_A_fkey" FOREIGN KEY ("A") REFERENCES "InSearchBand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InSearchBandToStyle" ADD CONSTRAINT "_InSearchBandToStyle_B_fkey" FOREIGN KEY ("B") REFERENCES "Style"("id") ON DELETE CASCADE ON UPDATE CASCADE;
