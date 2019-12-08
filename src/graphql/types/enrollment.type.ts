import { gql } from 'apollo-server-express';

export default gql`
  type Enrollment {
    id: String
    enrollmentYear: String
    qualificationId: String
    qualification: Qualification
    firstYearEstimated: Int
    secondYearEstimated: Int
    thirdYearEstimated: Int
  }
  input EnrollmentInput {
    id: String
    enrollmentYear: String
    qualificationId: String
    firstYearEstimated: Int
    secondYearEstimated: Int
    thirdYearEstimated: Int
  }
  type Query {
    enrollment(id: String!): Enrollment
    enrollments: [Enrollment]
    enrollmentsByYear(enrollmentYear: String!): [Enrollment]
    enrollmentsByQualification(qualificationId: String!): [Enrollment]
  }
  type Mutation {
    addEnrollment(enrollment: EnrollmentInput!): Enrollment
    editEnrollment(enrollment: EnrollmentInput!): Enrollment
    deleteEnrollment(enrollment: EnrollmentInput!): Enrollment
  }
`;
