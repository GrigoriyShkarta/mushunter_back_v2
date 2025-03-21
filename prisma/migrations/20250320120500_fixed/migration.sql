-- CreateTable
CREATE TABLE "_InSearchMusicianToStyle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_InSearchMusicianToStyle_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_InSearchMusicianToStyle_B_index" ON "_InSearchMusicianToStyle"("B");

-- AddForeignKey
ALTER TABLE "InSearchBand" ADD CONSTRAINT "InSearchBand_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InSearchMusician" ADD CONSTRAINT "InSearchMusician_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InSearchMusicianToStyle" ADD CONSTRAINT "_InSearchMusicianToStyle_A_fkey" FOREIGN KEY ("A") REFERENCES "InSearchMusician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InSearchMusicianToStyle" ADD CONSTRAINT "_InSearchMusicianToStyle_B_fkey" FOREIGN KEY ("B") REFERENCES "Style"("id") ON DELETE CASCADE ON UPDATE CASCADE;
