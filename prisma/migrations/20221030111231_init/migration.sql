-- CreateEnum
CREATE TYPE "NationalityType" AS ENUM ('UKRAINIAN', 'AMERICAN', 'FRANCE', 'BRITISH', 'CANADIAN', 'MEXICAN');

-- CreateTable
CREATE TABLE "movie" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "budget" INTEGER NOT NULL,
    "overview" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 1,
    "genreID" INTEGER NOT NULL,
    "directorID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actor" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "nationality" "NationalityType" NOT NULL DEFAULT E'UKRAINIAN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_genre" (
    "id" SERIAL NOT NULL,
    "movieID" INTEGER NOT NULL,
    "genreID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_actor" (
    "id" SERIAL NOT NULL,
    "movieID" INTEGER NOT NULL,
    "actorID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "director" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "nationality" "NationalityType" NOT NULL DEFAULT E'UKRAINIAN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "movie" ADD FOREIGN KEY ("directorID") REFERENCES "director"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_genre" ADD FOREIGN KEY ("movieID") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_genre" ADD FOREIGN KEY ("genreID") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_actor" ADD FOREIGN KEY ("movieID") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_actor" ADD FOREIGN KEY ("actorID") REFERENCES "actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
