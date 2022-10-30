import MoviesAPI from './datasources/MoviesApi';

export interface ApolloDataSources {
    moviesAPI: MoviesAPI;
}

export interface ApolloContext {
    dataSources: ApolloDataSources;
}

export type QueryInput<T> = Record<'input', T>;

export interface AddMovieProps {
    title: string;
    budget: number;
    overview: string;
    rating: number;
    genre: string;
    actors: string[];
    directorName: string;
}
