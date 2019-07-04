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
      const newTarrif = new Tarrif({
        dutyId: args.tarrif.dutyId,
        eventId: args.tarrif.eventId,
        description: args.tarrif.description,
        appliedTarrif: args.tarrif.appliedTarrif,
        minHours: args.tarrif.minHours,
        maxHours: args.tarrif.maxHours,
        explanation: args.tarrif.explanation,
        TRS: args.tarrif.TRS,
        evidenceRequired: args.tarrif.evidenceRequired
      });

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
          $set: {
            description: args.tarrif.description,
            appliedTarrif: args.tarrif.appliedTarrif,
            minHours: args.tarrif.minHours,
            maxHours: args.tarrif.maxHours,
            explanation: args.tarrif.explanation,
            TRS: args.tarrif.TRS,
            evidenceRequired: args.tarrif.evidenceRequired
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
    deleteTarrif: (root, args) => {
      return Tarrif.findOneAndRemove(args)
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
