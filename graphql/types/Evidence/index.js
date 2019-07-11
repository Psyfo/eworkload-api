import { gql } from 'apollo-server-core';

export default gql`
  type Evidence {
    evidenceId: String!
    name: String!
    item: String
  }

  type Query {
    evidence(evidenceId: String!): Evidence
    evidences: [Evidence]
  }

  type Mutation {
    addEvidence(name: String!, item: String): Evidence
    editEvidence(evidenceId: String, name: String, item: String): Evidence
    deleteEvidence(evidenceId: String, name: String, item: String): Evidence
  }
`;
