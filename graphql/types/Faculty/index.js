import { gql } from 'apollo-server-core';

export default gql`
  type Faculty {
    facultyId: String!
    name: String!
  }

  input FacultyInput {
    facultyId: String
    name: String
  }

  type Query {
    faculty(facultyId: String!): Faculty
    faculties: [Faculty]
  }

  type Mutation {
    addFaculty(faculty: FacultyInput): Faculty
    editFaculty(faculty: FacultyInput): Faculty
    deleteFaculty(faculty: FacultyInput): Faculty
  }
`;
