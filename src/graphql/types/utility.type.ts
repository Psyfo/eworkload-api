import { gql } from 'apollo-server-express';

export default gql`
  # type Query {

  # }
  type Mutation {
    resetModuleDepartments(departmentId: String!): String
  }
`;
