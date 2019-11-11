import { gql } from 'apollo-server-express';

export default gql`
  type ExecutiveManagementActivity implements Activity {
    activityId: String
    userId: String
    user: User
    dutyId: String
    duty: Duty
    approvalStatus: String
    createdAt: String
    updatedAt: String
    title: String
    description: String
    evidence: String
  }
  input ExecutiveManagementActivityInput {
    activityId: String
    userId: String
    dutyId: String
    title: String
    description: String
  }
  type Query {
    executiveManagementActivity(
      activityId: String!
    ): ExecutiveManagementActivity
    executiveManagementActivities: [ExecutiveManagementActivity]
    executiveManagementActivitiesByUser(
      userId: String
    ): [ExecutiveManagementActivity]
  }
  type Mutation {
    addExecutiveManagementActivity(
      activity: ExecutiveManagementActivityInput
    ): ExecutiveManagementActivity
    editExecutiveManagementActivity(
      activity: ExecutiveManagementActivityInput
    ): ExecutiveManagementActivity
    deleteExecutiveManagementActivity(
      activity: ExecutiveManagementActivityInput
    ): ExecutiveManagementActivity
  }
`;
