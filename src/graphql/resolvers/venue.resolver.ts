import * as VenueMethods from '../../controllers/venue.controller';

export default {
  Query: {
    venue: async (root: any, { venueId }: any) => {
      return await VenueMethods.venue(venueId);
    },
    venues: async () => {
      return await VenueMethods.venues();
    }
  },
  Mutation: {
    addVenue: async (root: any, { venue }: any) => {
      return await VenueMethods.addVenue(venue);
    },
    editVenue: async (root: any, { venue }: any) => {
      return await VenueMethods.editVenue(venue);
    },
    deleteVenue: async (root: any, { venue }: any) => {
      return await VenueMethods.deleteVenue(venue);
    }
  }
};
