import { gql } from 'apollo-server-express';

export default gql`
  type Qualification {
    qualificationId: String!
    name: String
    type: String
    departmentId: String
    department: Department
  }

  input QualificationInput {
    qualificationId: String
    name: String
    type: String
    departmentId: String
  }

  type Query {
    qualification(qualificationId: String!): Qualification
    qualifications: [Qualification]
    qualificationsPostgraduate: [Qualification]
    qualificationsNoEnrollment: [Qualification]
  }

  type Mutation {
    addQualification(qualification: QualificationInput): Qualification
    editQualification(qualification: QualificationInput): Qualification
    deleteQualification(qualification: QualificationInput): Qualification
  }
`;
