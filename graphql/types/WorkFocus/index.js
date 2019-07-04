import gql from 'graphql-tag';

export default gql `
  type WorkFocus {
    name: String!
    teachingRatio: Int
    researchRatio: Int
    serviceRatio: Int
  }

  input WorkFocusInput {
    name: String
    teachingRatio: Int
    researchRatio: Int
    serviceRatio: Int
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