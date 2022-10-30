import { gql } from 'apollo-server';

const moviesTypeDefs = gql`
    type Query {
        dummy: String
        # actors: [Actor]
        # actor: Actor
        # actorDetails(actorId: ID!): ActorDetails
        # genres: [Genre]
        # movies: [Movie]
    }

    type Mutation {
        dummyMutation: String
        # addMovie(input: CreateMovieInput!): Movie
    }
`;

export default moviesTypeDefs;
