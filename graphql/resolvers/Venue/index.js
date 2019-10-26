import * as VenueMethods from './../../../controllers/venue';

export default {
  Query: {
    venue: async (root, args) => {
      return await VenueMethods.venue(args.venueId);
    },
    venues: async () => {
      return await VenueMethods.venues();
    }
  },
  Mutation: {
    addVenue: async (root, args) => {
      return await VenueMethods.addVenue(args.venue);
    },
    editVenue: async (root, args) => {
      return await VenueMethods.editVenue(args.venue);
    },
    deleteVenue: async (root, args) => {
      return await VenueMethods.deleteVenue(args.venue);
    }
  }
};
