import * as VenueMethods from '../../../controllers/venue';

export default {
  Query: {
    venue: (root, args) => {
      return VenueMethods.venue(args.venueId);
    },
    venues: () => {
      return VenueMethods.venues();
    }
  },
  Mutation: {
    addVenue: (root, args) => {
      return VenueMethods.addVenue(args.venue);
    },
    editVenue: (root, args) => {
      return VenueMethods.editVenue(args.venue);
    },
    deleteVenue: (root, args) => {
      return VenueMethods.deleteVenue(args.venue);
    }
  }
};
