/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
    await prisma.genre.create({
        data: {
            name: 'Horror',
        },
    });
    await prisma.genre.create({
        data: {
            name: 'Action',
        },
    });
    await prisma.genre.create({
        data: {
            name: 'Thriller',
        },
    });
    await prisma.genre.create({
        data: {
            name: 'Drama',
        },
    });
    await prisma.genre.create({
        data: {
            name: 'Western',
        },
    });
    await prisma.genre.create({
        data: {
            name: 'Adventure',
        },
    });
    await prisma.genre.create({
        data: {
            name: 'Fantasy',
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
