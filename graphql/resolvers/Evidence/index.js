import Evidence from '../../../models/evidence';

export default {
  Query: {
    evidence: (root, args) => {
      return Evidence.findOne(args)
        .populate()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    evidences: () => {
      return Evidence.find({})
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
    addEvidence: (root, args) => {
      const newEvidence = new Evidence({
        evidenceId: args.evidenceId,
        name: args.name,
        item: args.item
      });

      return newEvidence
        .save()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    editEvidence: (root, args) => {
      return Evidence.findOneAndUpdate(
        {
          evidenceId: args.evidenceId
        },
        {
          $set: {
            name: args.name,
            item: args.item
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
    deleteEvidence: (root, args) => {
      return Evidence.findOneAndRemove(args)
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
