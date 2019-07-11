import { gql } from 'apollo-server-core';

export default gql`
  type AcademicAdministrationActivity implements Activity {
    activityId: String!
    userId: String!
    user: User
    dutyId: String!
    duty: Duty
    approvalStatus: String
    createdAt: String
    updatedAt: String
    title: String
    description: String
    evidenceId: String
    evidence: Evidence
  }

  input AcademicAdministrationActivityInput {
    userId: String
    dutyId: String
    title: String
    description: String
    evidenceId: String
  }

  type Query {
    academicAdministrationActivity(
      activityId: String!
    ): AcademicAdministrationActivity
    academicAdministrationActivities: [AcademicAdministrationActivity]
    academicAdministrationActivitiesByUser(
      userId: String
    ): [AcademicAdministrationActivity]
  }
  type Mutation {
    addAcademicAdministrationActivity(
      academicAdministrationActivity: AcademicAdministrationActivityInput
    ): AcademicAdministrationActivity
    editAcademicAdministrationActivity(
      academicAdministrationActivity: AcademicAdministrationActivityInput
    ): AcademicAdministrationActivity
    deleteAcademicAdministrationActivity(
      academicAdministrationActivity: AcademicAdministrationActivityInput
    ): AcademicAdministrationActivity
  }
`;
