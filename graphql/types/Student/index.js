import gql from 'graphql-tag';

export default gql `
  type Student {
    studentId: String!
    email: String!
    firstName: String!
    lastName: String!
    title: String!
    year: String!
  }

  input StudentInput {
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
    addStudent(student: StudentInput): Student
    editStudent(student: StudentInput): Student
    deleteStudent(student: StudentInput): Student
  }
`;