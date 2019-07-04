import gql from 'graphql-tag';

export default gql`
  type User {
    userId: String!
    password: String
    email: String
    firstName: String
    lastName: String
    photoUrl: String
    disciplineId: String
    discipline: Discipline
    positionId: String
    position: Position
    workFocusName: String
    workFocus: WorkFocus
    gender: String
    nationality: String
  }

  input UserInput {
    userId: String!
    password: String
    email: String
    firstName: String
    lastName: String
    photoUrl: String
    disciplineId: String
    positionId: String
    workFocusName: String
    gender: String
    nationality: String
  }

  type AuthData {
    userId: String!
    token: String!
    tokenExpiration: Int!
  }

  type ExistData {
    exists: Boolean
  }

  type Query {
    user(userId: String!): User
    users: [User]
    login(userId: String!, password: String!): AuthData
    userExists(userId: String): ExistData
  }

  type Mutation {
    addUser(user: UserInput): User
    editUser(user: UserInput): User
    deleteUser(user: UserInput): User
    changePassword(
      userId: String
      oldPassword: String
      newPassword: String
    ): User
  }
`;
