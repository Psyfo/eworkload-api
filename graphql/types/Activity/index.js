import { gql } from 'apollo-server-core';

export default gql`
  interface Activity {
    activityId: String!
    userId: String!
    user: User
    dutyId: String!
    duty: Duty
    approvalStatus: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    activity(activityId: String!): Activity
    activities: [Activity]
    activitiesByDuty(dutyId: String!): [Activity]
    activitiesByUser(userId: String!): [Activity]
    activitiesByUnapproved: [Activity]
    activitiesByApproved: [Activity]
  }

  #   type Mutation {

  #   }
`;
