import { gql } from 'apollo-server-express';

export default gql`
  type Student {
    studentId: String
    firstName: String
    lastName: String
    email: String
    type: String
    title: String
    graduationDate: String
  }

  input StudentInput {
    studentId: String
    firstName: String
    lastName: String
    email: String
    type: String
    title: String
  }

  type Query {
    student(studentId: String!): Student
    students: [Student]
    studentsUnassigned(userId: String!): [Student]
  }

  type Mutation {
    addStudent(student: StudentInput): Student
    editStudent(student: StudentInput): Student
    deleteStudent(student: StudentInput): Student
  }
`;
