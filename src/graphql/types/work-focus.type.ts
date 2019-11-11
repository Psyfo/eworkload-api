import { gql } from 'apollo-server-express';

export default gql`
  type WorkFocus {
    name: String!
    teachingRatio: Float
    researchRatio: Float
    serviceRatio: Float
  }

  input WorkFocusInput {
    name: String
    teachingRatio: Float
    researchRatio: Float
    serviceRatio: Float
  }

  type Query {
    workFocus(name: String!): WorkFocus
    workFocuses: [WorkFocus]
  }

  type Mutation {
    addWorkFocus(workFocus: WorkFocusInput): WorkFocus
    editWorkFocus(workFocus: WorkFocusInput): WorkFocus
    deleteWorkFocus(workFocus: WorkFocusInput): WorkFocus
  }
`;
