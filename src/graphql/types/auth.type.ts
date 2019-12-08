import { gql } from 'apollo-server-express';

export default gql`
  type AuthData {
    userId: String!
    token: String!
    tokenExpiration: Int!
  }

  type Query {
    login(userId: String!, password: String!): AuthData!
  }

  type Mutation {
    changePassword(userId: String!, password: String!, newPassword: String!): String!
  }
`;
