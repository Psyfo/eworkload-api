import { gql } from 'apollo-server-core';

export default gql`
  type PublicServiceActivity implements Activity {
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

  input PublicServiceActivityInput {
    userId: String
    dutyId: String
    title: String
    description: String
    evidenceId: String
  }

  type Query {
    publicServiceActivity(activityId: String): PublicServiceActivity
    publicServiceActivities: [PublicServiceActivity]
    publicServiceActivitiesByUser(userId: String): [PublicServiceActivity]
  }
  type Mutation {
    addPublicServiceActivity(
      publicServiceActivity: PublicServiceActivityInput
    ): PublicServiceActivity
    editPublicServiceActivity(
      publicServiceActivity: PublicServiceActivityInput
    ): PublicServiceActivity
    deletePublicServiceActivity(
      publicServiceActivity: PublicServiceActivityInput
    ): PublicServiceActivity
  }
`;
