import { gql } from 'apollo-server-core';

export default gql`
  type Evidence {
    evidenceId: String!
    name: String
    url: String
  }

  input EvidenceInput {
    evidenceId: String
    name: String
    url: String
  }

  type Query {
    evidence(evidenceId: String!): Evidence
    evidences: [Evidence]
  }

  type Mutation {
    addEvidence(evidence: EvidenceInput): Evidence
    editEvidence(evidence: EvidenceInput): Evidence
    deleteEvidence(evidence: EvidenceInput): Evidence
  }
`;
