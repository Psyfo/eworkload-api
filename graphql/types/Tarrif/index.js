import { gql } from 'apollo-server-core';

export default gql`
  type Tarrif {
    dutyId: String!
    eventId: String!
    description: String
    appliedTarrif: String
    minHours: Int
    maxHours: Int
    explanation: String
    TRS: String
    evidenceRequired: Boolean
  }

  input TarrifInput {
    dutyId: String!
    eventId: String!
    description: String
    appliedTarrif: String
    minHours: Int
    maxHours: Int
    explanation: String
    TRS: String
    evidenceRequired: Boolean
  }

  type Query {
    tarrif(dutyId: String!, eventId: String!): Tarrif
    tarrifs: [Tarrif]
  }

  type Mutation {
    addTarrif(tarrif: TarrifInput): Tarrif
    editTarrif(tarrif: TarrifInput): Tarrif
    deleteTarrif(tarrif: TarrifInput): Tarrif
  }
`;
