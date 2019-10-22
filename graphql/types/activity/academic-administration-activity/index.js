import { gql } from 'apollo-server-core';

export default gql`
  type AcademicAdministrationActivity implements Activity {
    activityId: String
    userId: String
    user: User
    dutyId: String
    duty: Duty
    approvalStatus: String
    createdAt: String
    updatedAt: String
    title: String
    qualificationId: String
    qualification: Qualification
    description: String
    evidence: String
  }

  input AcademicAdministrationActivityInput {
    activityId: String
    userId: String
    dutyId: String
    title: String
    qualificationId: String
    description: String
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
      activity: AcademicAdministrationActivityInput
    ): AcademicAdministrationActivity
    editAcademicAdministrationActivity(
      activity: AcademicAdministrationActivityInput
    ): AcademicAdministrationActivity
    deleteAcademicAdministrationActivity(
      activity: AcademicAdministrationActivityInput
    ): AcademicAdministrationActivity
  }
`;
