import gql from 'graphql-tag';

export default gql`
  type User {
    userId: String!
    password: String!
    email: String!
    firstName: String!
    lastName: String!
    photoUrl: String!
    disciplineId: String!
    discipline: Discipline
    positionId: String!
    position: Position
    gender: String!
    nationality: String!
  }

  type AuthData {
    userId: String!
    token: String!
    tokenExpiration: Int!
  }

  type Query {
    user(userId: String!): User
    users: [User]
    login(userId: String!, password: String!): AuthData
  }

  type Mutation {
    addUser(
      userId: String!
      password: String!
      email: String!
      firstName: String!
      lastName: String!
      photoUrl: String!
      disciplineId: String!
      positionId: String!
      gender: String!
      nationality: String!
    ): User
    editUser(
      userId: String
      password: String
      email: String
      firstName: String
      lastName: String
      photoUrl: String
      disciplineId: String
      positionId: String
      gender: String
      nationality: String
    ): User
    deleteUser(
      userId: String
      password: String
      email: String
      firstName: String
      lastName: String
      photoUrl: String
      disciplineId: String
      positionId: String
      gender: String
      nationality: String
    ): User
  }
`;
