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
    dates: [Date]
    conferenceActivities: [String]
    authors: [String]
    url: String
    evidence: String
  }

  input ResearchActivityInput {
    activityId: String
    userId: String
    dutyId: String
    output: String
    title: String
    details: String
    dates: [Date]
    conferenceActivities: [String]
    authors: [String]
    url: String
    evidenceId: String
  }

  type Query {
    researchActivity(activityId: String!): ResearchActivity
    researchActivities: [ResearchActivity]
    researchActivitiesByUser(userId: String!): [ResearchActivity]
  }
  type Mutation {
    addResearchActivity(activity: ResearchActivityInput): ResearchActivity
    editResearchActivity(activity: ResearchActivityInput): ResearchActivity
    deleteResearchActivity(activity: ResearchActivityInput): ResearchActivity
  }
`;
