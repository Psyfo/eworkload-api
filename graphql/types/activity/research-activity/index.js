import { gql } from 'apollo-server-core';

export default gql`
  type ResearchActivity implements Activity {
    activityId: String!
    userId: String!
    user: User
    dutyId: String!
    duty: Duty
    approvalStatus: String
    createdAt: String
    updatedAt: String
    researchType: String
    researchTitle: String
    researchDetails: String
  }

  input ResearchActivityInput {
    userId: String
    dutyId: String
    researchType: String
    researchTitle: String
    researchDetails: String
    evidenceId: String
  }

  type Query {
    researchActivity(activityId: String!): ResearchActivity
    researchActivities: [ResearchActivity]
    researchActivitiesByUser(userId: String!): [ResearchActivity]
  }
  type Mutation {
    addResearchActivity(
      researchActivity: ResearchActivityInput
    ): ResearchActivity
    editResearchActivity(
      researchActivity: ResearchActivityInput
    ): ResearchActivity
    deleteResearchActivity(
      researchActivity: ResearchActivityInput
    ): ResearchActivity
  }
`;
