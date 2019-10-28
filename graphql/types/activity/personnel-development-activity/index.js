import { gql } from 'apollo-server-core';

export default gql`
  type PersonnelDevelopmentActivity implements Activity {
    activityId: String
    userId: String
    user: User
    dutyId: String
    duty: Duty
    approvalStatus: String
    createdAt: String
    updatedAt: String
    title: String
    date: [Date]
    duration: String
    evidence: String
  }

  input PersonnelDevelopmentActivityInput {
    activityId: String
    userId: String
    dutyId: String
    title: String
    date: [Date]
    duration: String
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
      activity: PersonnelDevelopmentActivityInput
    ): PersonnelDevelopmentActivity
    editPersonnelDevelopmentActivity(
      activity: PersonnelDevelopmentActivityInput
    ): PersonnelDevelopmentActivity
    deletePersonnelDevelopmentActivity(
      activity: PersonnelDevelopmentActivityInput
    ): PersonnelDevelopmentActivity
  }
`;
