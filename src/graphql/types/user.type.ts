import { gql } from 'apollo-server-express';

export default gql`
  type User {
    userId: String
    email: String
    firstName: String
    lastName: String
    photoUrl: String
    disciplineIds: [String]
    disciplines: [Discipline]
    positionId: String
    position: Position
    departmentId: String
    department: Department
    workFocusName: String
    workFocus: WorkFocus
    gender: String
    nationality: String
  }

  input UserInput {
    userId: String
    password: String
    email: String
    firstName: String
    lastName: String
    photoUrl: String
    disciplineIds: [String]
    positionId: String
    departmentId: String
    workFocusName: String
    gender: String
    nationality: String
  }

  type Query {
    user(userId: String!): User
    users: [User]
    usersByPosition: [User]
    userExists(userId: String): Boolean
    # profilePicture: [File]
  }

  type Mutation {
    addUser(user: UserInput): User
    editUser(user: UserInput): User
    deleteUser(user: UserInput): User
    assignProfilePicture(userId: String, photoUrl: String): User
  }
`;
