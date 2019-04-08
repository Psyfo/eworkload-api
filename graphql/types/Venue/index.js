import gql from 'graphql-tag';

export default gql`
  type Venue {
    venueId: String!
    campus: String!
    capacity: Int!
  }

  type Query {
    venue(venueId: String!): Venue
    venues: [Venue]
  }

  type Mutation {
    addVenue(venueId: String!, campus: String!, capacity: Int!): Venue
    editVenue(venueId: String, campus: String, capacity: Int): Venue
    deleteVenue(venueId: String, campus: String, capacity: Int): Venue
  }
`;
