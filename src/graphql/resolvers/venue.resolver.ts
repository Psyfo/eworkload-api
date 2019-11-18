import VenueController from '../../controllers/venue.controller';

export default {
  Query: {
    venue: async (root: any, { venueId }: any) => {
      return await VenueController.venue(venueId);
    },
    venues: async () => {
      return await VenueController.venues();
    }
  },
  Mutation: {
    addVenue: async (root: any, { venue }: any) => {
      return await VenueController.createVenue(venue);
    },
    editVenue: async (root: any, { venue }: any) => {
      return await VenueController.updateVenue(venue);
    },
    deleteVenue: async (root: any, { venue }: any) => {
      return await VenueController.deleteVenue(venue);
    }
  }
};
