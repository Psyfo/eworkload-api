import { gql } from 'apollo-server-core';

export default gql`
  type PersonnelDevelopmentActivity implements Activity {
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

  input PersonnelDevelopmentActivityInput {
    userId: String
    dutyId: String
    title: String
    description: String
    evidenceId: String
  }

  type Query {
    personnelDevelopmentActivity(
      activityId: String!
    ): PersonnelDevelopmentActivity
    personnelDevelopmentActivities: [PersonnelDevelopmentActivity]
    personnelDevelopmentActivitiesByUser(
      userId: String
    ): [PersonnelDevelopmentActivity]
  }
  type Mutation {
    addPersonnelDevelopmentActivity(
      personnelDevelopmentActivity: PersonnelDevelopmentActivityInput
    ): PersonnelDevelopmentActivity
    editPersonnelDevelopmentActivity(
      personnelDevelopmentActivity: PersonnelDevelopmentActivityInput
    ): PersonnelDevelopmentActivity
    deletePersonnelDevelopmentActivity(
      personnelDevelopmentActivity: PersonnelDevelopmentActivityInput
    ): PersonnelDevelopmentActivity
  }
`;
