import OfferingType from '../../../models/offering-type';

export default {
  Query: {
    offeringType: (root, args) => {
      return OfferingType.findOne(args)
        .populate()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    offeringTypes: () => {
      return OfferingType.find({})
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
    addOfferingType: (root, args) => {
      const newOfferingType = new OfferingType({
        description: args.offeringType.description
      });

      return newOfferingType
        .save()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    editOfferingType: (root, args) => {
      return OfferingType.findOneAndUpdate(
        {
          offeringTypeId: args.offeringType.offeringTypeId
        },
        {
          $set: {
            description: args.offeringType.description
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
    deleteOfferingType: (root, args) => {
      return OfferingType.findOneAndRemove(args.offeringType)
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
