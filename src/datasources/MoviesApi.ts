import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { PrismaClient, Genre, Movie, Actor, Director } from '@prisma/client';
import { ApolloContext, AddMovieProps } from '../types';

class MoviesApi extends DataSource {
    database: PrismaClient;

    context: Maybe<ApolloContext> = null;

    constructor(database: PrismaClient) {
        super();
        this.database = database;
    }

    initialize(config: DataSourceConfig<ApolloContext>): void | Promise<void> {
        this.context = config.context;
    }

    async getGenres(): Promise<Genre[]> {
        return this.database.genre.findMany({});
    }

    async getGenre(id: number): Promise<Maybe<Genre>> {
        return this.database.genre.findFirst({
            where: { id },
        });
    }

    async getGenreByName(name: string): Promise<Maybe<Genre>> {
        return this.database.genre.findFirst({
            where: { name },
        });
    }

    async getMovies(): Promise<Movie[]> {
        return this.database.movie.findMany({});
    }

    async getMovieGenres(movieId: string): Promise<Genre[]> {
        return this.database.genre.findMany({
            where: { movies: { some: { movieID: Number(movieId) } } },
        });
    }

    async getMovieActors(movieId: number): Promise<Actor[]> {
        return this.database.actor.findMany({
            where: { movies: { some: { movieID: movieId } } },
        });
    }

    async getMovie(id: number): Promise<Maybe<Movie>> {
        return this.database.movie.findFirst({
            where: { id },
        });
    }

    async getActors(): Promise<Actor[]> {
        return this.database.actor.findMany({});
    }

    async getActorMovies(actorId: number): Promise<Movie[]> {
        return this.database.movie.findMany({
            where: { actors: { some: { actorID: actorId } } },
        });
    }

    async getActor(id: number): Promise<Maybe<Actor>> {
        return this.database.actor.findFirst({
            where: { id },
        });
    }

    async getActorByName(name: string): Promise<Maybe<Actor>> {
        return this.database.actor.findFirst({
            where: { name },
        });
    }

    async getActorsByNames(names: string[]): Promise<Actor[]> {
        return this.database.actor.findMany({
            where: { name: { in: names } },
        });
    }

    async getMoviesByGenre(genreId: number): Promise<Movie[]> {
        return this.database.movie.findMany({
            where: { genres: { some: { id: genreId } } },
        });
    }

    async getActorsByMovie(movieId: number): Promise<Actor[]> {
        return this.database.actor.findMany({
            where: { movies: { some: { id: movieId } } },
        });
    }

    async getDirectorByName(name: string): Promise<Maybe<Director>> {
        return this.database.director.findFirst({
            where: { name },
        });
    }

    async addActors(names: string[]): Promise<ObjectLiteral> {
        return this.database.actor.createMany({
            skipDuplicates: true,
            data: names.map((name) => ({ name })),
        });
    }

    async addGenre(name: string): Promise<Genre> {
        return this.database.genre.create({
            data: { name },
        });
    }

    async addDirector(name: string): Promise<Director> {
        return this.database.director.create({
            data: { name },
        });
    }

    async addMovie(input: AddMovieProps): Promise<Movie> {
        const { title, budget, overview, rating, genre, actors = [], directorName } = input;

        const existingGenre = await this.getGenreByName(genre);
        const existingDirector = await this.getDirectorByName(directorName);

        const existingActors = await this.getActorsByNames(actors);
        const nonExistingActors = actors.filter((actor) => !existingActors.find((a) => a.name === actor));

        return this.database.movie.create({
            data: {
                title,
                budget,
                overview,
                rating,
                genres: {
                    create: [
                        {
                            genre: {
                                connectOrCreate: {
                                    where: {
                                        id: Number(existingGenre?.id ?? -1),
                                    },
                                    create: {
                                        name: genre,
                                    },
                                },
                            },
                        },
                    ],
                },
                actors: {
                    connect: existingActors.map(({ id }) => ({ id })),
                    create: nonExistingActors.map((name) => ({
                        actor: {
                            create: {
                                name,
                            },
                        },
                    })),
                },
                director: {
                    connectOrCreate: {
                        where: {
                            id: existingDirector?.id ?? -1,
                        },
                        create: { name: directorName },
                    },
                },
            },
            include: {
                genres: true,
            },
        });
    }

    async removeMovie(id: number): Promise<Movie> {
        return this.database.movie.delete({
            where: { id },
            include: {
                genres: true,
            },
        });
    }
}

export default MoviesApi;
