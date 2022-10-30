/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `genre` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "genre.name_unique" ON "genre"("name");
