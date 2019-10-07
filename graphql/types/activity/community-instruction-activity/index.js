import { gql } from 'apollo-server-core';

export default gql`
  type CommunityInstructionActivity implements Activity {
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

  input CommunityInstructionActivityInput {
    activityId: String
    userId: String
    dutyId: String
    title: String
    description: String
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
      activity: CommunityInstructionActivityInput
    ): CommunityInstructionActivity
    editCommunityInstructionActivity(
      activity: CommunityInstructionActivityInput
    ): CommunityInstructionActivity
    deleteCommunityInstructionActivity(
      activity: CommunityInstructionActivityInput
    ): CommunityInstructionActivity
  }
`;
