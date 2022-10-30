/* eslint-disable no-console */
import { ApolloServer } from 'apollo-server';
import schema from './schema';
import database from './database';
import MoviesAPI from './datasources/MoviesApi';

const port = process.env.PORT || 9090;

const server = new ApolloServer({
    schema,
    dataSources: (): ObjectLiteral => ({
        moviesAPI: new MoviesAPI(database),
    }),
});

server.listen({ port }, () => console.log(`Server runs at: http://localhost:${port}`));
