import { gql } from 'apollo-server-core';

export default gql`
  type ExecutiveManagementActivity implements Activity {
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

  input ExecutiveManagementActivityInput {
    userId: String
    dutyId: String
    title: String
    description: String
    evidenceId: String
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
      executiveManagementActivity: ExecutiveManagementActivityInput
    ): ExecutiveManagementActivity
    editExecutiveManagementActivity(
      executiveManagementActivity: ExecutiveManagementActivityInput
    ): ExecutiveManagementActivity
    deleteExecutiveManagementActivity(
      executiveManagementActivity: ExecutiveManagementActivityInput
    ): ExecutiveManagementActivity
  }
`;
