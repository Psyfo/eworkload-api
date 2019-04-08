import gql from 'graphql-tag';

export default gql`
  type Student {
    studentId: String!
    email: String!
    firstName: String!
    lastName: String!
    title: String!
    year: String!
  }

  type Query {
    student(studentId: String!): Student
    students: [Student]
  }

  type Mutation {
    addStudent(
      studentId: String!
      email: String!
      firstName: String!
      lastName: String!
      title: String
      year: String
    ): Student
    editStudent(
      studentId: String!
      email: String
      firstName: String
      lastName: String
      title: String
      year: String
    ): Student
    deleteStudent(
      studentId: String!
      email: String
      firstName: String
      lastName: String
      title: String
      year: String
    ): Student
  }
`;
