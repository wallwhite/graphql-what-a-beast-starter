import { gql } from 'apollo-server';

const root = gql`
    # The dummy queries and mutations are necessary because
    # graphql cannot have empty root types and we only extend
    # these types later on
    # Ref: apollographql/graphql-tools#293
    type Query {
        dummy: String
    }
    type Mutation {
        dummy: String
    }
    type Subscription {
        dummy: String
    }
    schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
    }
`;

export default root;
