import Tarrif from '../../../models/Tarrif';

export default {
  Query: {
    tarrif: (root, args) => {
      return Tarrif.findOne(args)
        .populate()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    tarrifs: () => {
      return Tarrif.find({})
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
    addTarrif: (root, args) => {
      const newTarrif = new Tarrif(args.tarrif);

      return newTarrif
        .save()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    editTarrif: (root, args) => {
      return Tarrif.findOneAndUpdate(
        {
          dutyId: args.tarrif.dutyId,
          eventId: args.tarrif.eventId
        },
        {
          $set: args.tarrif
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
    deleteTarrif: (root, args) => {
      return Tarrif.findOneAndRemove(args.tarrif)
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
