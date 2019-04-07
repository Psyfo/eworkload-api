const gql = require('graphql-tag');

export default `
    type Venue {
        venueId: String!,
        name: String!,
        capacity: Int!
    }

    type Query {
        venue(venueId: String!): Venue
        venues: [Venue]
    }

    type Mutation {
        addVenue(venueId: String!, name: String!, capacity: Int!): Venue
        editVenue(venueId: String, name: String, capacity: Int): Venue
        deleteVenue(venueId: String, name: String, capacity: Int): Venue
    }
`;