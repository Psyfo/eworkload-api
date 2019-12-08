import { gql } from 'apollo-server-express';

export default gql`
  type Group {
    id: String
    groupId: String
    moduleId: String
    module: Module
    studentsEnrolled: Int
    modularity: Int
  }

  input GroupInput {
    id: String
    groupId: String
    moduleId: String
    studentsEnrolled: Int
    modularity: Int
  }

  type Query {
    group(id: String!): Group
    groups: [Group]
    groupsByModule(moduleId: String!): [Group]
    groupTotal(moduleId: String!): Int
    remainingStudents(moduleId: String!): Int
    groupExists(groupId: String!, moduleId: String!): Boolean
  }

  type Mutation {
    createGroup(group: GroupInput!): Group
    updateGroup(group: GroupInput!): Group
    deleteGroup(group: GroupInput!): Group
  }
`;
