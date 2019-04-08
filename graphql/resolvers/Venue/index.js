import Venue from '../../../models/venue';

export default {
  Query: {
    venue: (root, args) => {
      return Venue.findOne(args)
        .populate()
        .populate()
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
    }
  },
  Mutation: {
    addVenue: (root, args) => {
      const newVenue = new Venue({
        venueId: args.venueId,
        campus: args.campus,
        capacity: args.capacity
      });

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
          venueId: args.venueId
        },
        {
          $set: {
            campus: args.campus,
            capacity: args.capacity
          }
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
      return Venue.findOneAndRemove(args)
        .populate()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
