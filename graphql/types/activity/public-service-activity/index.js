import { gql } from 'apollo-server-core';

export default gql`
  type PublicServiceActivity implements Activity {
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

  input PublicServiceActivityInput {
    activityId: String
    userId: String
    dutyId: String
    title: String
    description: String
  }

  type Query {
    publicServiceActivity(activityId: String): PublicServiceActivity
    publicServiceActivities: [PublicServiceActivity]
    publicServiceActivitiesByUser(userId: String): [PublicServiceActivity]
  }
  type Mutation {
    addPublicServiceActivity(
      activity: PublicServiceActivityInput
    ): PublicServiceActivity
    editPublicServiceActivity(
      activity: PublicServiceActivityInput
    ): PublicServiceActivity
    deletePublicServiceActivity(
      activity: PublicServiceActivityInput
    ): PublicServiceActivity
  }
`;
