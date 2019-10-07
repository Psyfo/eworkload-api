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
      const newEvidence = new Evidence(args.evidence);

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
          evidenceId: args.evidence.evidenceId
        },
        {
          $set: args.evidence
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
      return Evidence.findOneAndRemove(args.evidence)
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
