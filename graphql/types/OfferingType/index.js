import gql from 'graphql-tag';

export default gql`
    type OfferingType {
        offeringTypeId: String!,
        description: String!
    }

    type Query {
        offeringType(offeringTypeId: String!): OfferingType
        offeringTypes: [OfferingType]
    }

    type Mutation {
        addOfferingType(description: String!): OfferingType
        editOfferingType(offeringTypeId: String, description: String): OfferingType
        deleteOfferingType(offeringTypeId: String, description: String): OfferingType
    }
`;