import { gql } from 'apollo-server-express';

export default gql`
  type OfferingType {
    offeringTypeId: String!
    description: String!
  }

  input OfferingTypeInput {
    description: String
  }

  type Query {
    offeringType(offeringTypeId: String!): OfferingType
    offeringTypes: [OfferingType]
  }

  type Mutation {
    addOfferingType(offeringType: OfferingTypeInput): OfferingType
    editOfferingType(offeringType: OfferingTypeInput): OfferingType
    deleteOfferingType(offeringType: OfferingTypeInput): OfferingType
  }
`;
