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
    output: String
    title: String
    details: String
    evidenceId: String
    evidence: Evidence
  }

  input ResearchActivityInput {
    userId: String
    dutyId: String
    output: String
    title: String
    details: String
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
