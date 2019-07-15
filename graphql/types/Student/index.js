import { gql } from 'apollo-server-core';

export default gql`
  type Student {
    studentId: String!
    firstName: String!
    lastName: String!
    email: String!
    type: String!
    title: String!
    year: String!
    graduationDate: String
  }

  input StudentInput {
    studentId: String!
    firstName: String!
    lastName: String!
    email: String!
    type: String!
    title: String!
    year: String!
  }

  type Query {
    student(studentId: String!): Student
    students: [Student]
  }

  type Mutation {
    addStudent(student: StudentInput): Student
    editStudent(student: StudentInput): Student
    deleteStudent(student: StudentInput): Student
  }
`;
