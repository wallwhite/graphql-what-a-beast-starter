/*
  Warnings:

  - You are about to drop the column `genreID` on the `movie` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `actor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `director` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `movie` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "movie" DROP COLUMN "genreID";

-- CreateIndex
CREATE UNIQUE INDEX "actor.name_unique" ON "actor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "director.name_unique" ON "director"("name");

-- CreateIndex
CREATE UNIQUE INDEX "movie.title_unique" ON "movie"("title");
