import { gql } from 'apollo-server-express';

export default gql`
  type Venue {
    venueId: String
    campus: String
    capacity: Int
    type: String
  }

  input VenueInput {
    venueId: String
    campus: String
    capacity: Int
    type: String
  }

  type Query {
    venue(venueId: String!): Venue
    venues: [Venue]
  }

  type Mutation {
    addVenue(venue: VenueInput): Venue
    editVenue(venue: VenueInput): Venue
    deleteVenue(venue: VenueInput): Venue
  }
`;
