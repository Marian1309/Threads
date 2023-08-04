import { gql } from '@apollo/client';

const typeDefs = gql`
  type Query {
    users: [User]
    userById(id: ID!): User
  }

  type Mutation {}

  type User {
    id: ID
    name: String
    email: String
  }
`;

export default typeDefs;
