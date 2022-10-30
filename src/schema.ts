/**
 * The combined schema out of types and resolvers (queries, mutations and subscriptions)
 */
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

// Create the final GraphQL schema out of the type definitions
// and the resolvers
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;
