import Venue from '../../../models/venue';

export default {
  Query: {
    venue: (root, args) => {
      return Venue.findOne({ venueId: args.venueId })
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    venues: () => {
      return Venue.find({})
        .populate()
        .populate()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
  },
  Mutation: {
    addVenue: (root, args) => {
      const newVenue = new Venue(args.venue);

      return newVenue
        .save()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    editVenue: (root, args) => {
      return Venue.findOneAndUpdate(
        {
          venueId: args.venue.venueId,
        },
        {
          $set: {
            campus: args.venue.campus,
            capacity: args.venue.capacity,
          },
        }
      )
        .populate()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteVenue: (root, args) => {
      return Venue.findOneAndRemove(args.venue)
        .populate()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
  },
};
