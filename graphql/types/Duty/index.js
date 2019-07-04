import gql from 'graphql-tag';

export default gql `
  type Duty {
    dutyId: String!
    name: String
    description: String
  }

  input DutyInput {
    dutyId: String
    name: String
    description: String
  }

  type Query {
    duty(dutyId: String!): Duty
    duties: [Duty]
  }

  type Mutation {
    addDuty(duty: DutyInput): Duty
    editDuty(duty: DutyInput): Duty
    deleteDuty(duty: DutyInput): Duty
  }
`;