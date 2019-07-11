import { gql } from 'apollo-server-core';

export default gql`
  type CommunityInstructionActivity implements Activity {
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

  input CommunityInstructionActivityInput {
    userId: String
    dutyId: String
    title: String
    description: String
    evidenceId: String
  }

  type Query {
    communityInstructionActivity(
      activityId: String!
    ): CommunityInstructionActivity
    communityInstructionActivities: [CommunityInstructionActivity]
    communityInstructionActivitiesByUser(
      userId: String
    ): [CommunityInstructionActivity]
  }
  type Mutation {
    addCommunityInstructionActivity(
      communityInstructionActivity: CommunityInstructionActivityInput
    ): CommunityInstructionActivity
    editCommunityInstructionActivity(
      communityInstructionActivity: CommunityInstructionActivityInput
    ): CommunityInstructionActivity
    deleteCommunityInstructionActivity(
      communityInstructionActivity: CommunityInstructionActivityInput
    ): CommunityInstructionActivity
  }
`;
