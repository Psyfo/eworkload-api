import gql from 'graphql-tag';

export default gql `
  type Enrollment {
    enrollmentId: String!
    enrollmentYear: String
    qualificationId: String
    qualification: Qualification
    firstYearEstimated: Int
    secondYearEstimated: Int
    thirdYearEstimated: Int
  }

  input EnrollmentInput {
    enrollmentYear: String
    qualificationId: String
    firstYearEstimated: Int
    secondYearEstimated: Int
    thirdYearEstimated: Int
  }

  type StudentData {
    students: Int
  }

  type Query {
    enrollment(enrollmentYear: String, qualificationId: String): Enrollment
    enrollments: [Enrollment]
    enrollmentsByYear(enrollmentYear: String): [Enrollment]
    enrollmentsByQualification(qualificationId: String): [Enrollment]
    studentsEnrolled(moduleId: String): StudentData
  }

  type Mutation {
    addEnrollment(enrollment: EnrollmentInput): Enrollment
    editEnrollment(enrollment: EnrollmentInput): Enrollment
    deleteEnrollment(enrollment: EnrollmentInput): Enrollment
  }
`;