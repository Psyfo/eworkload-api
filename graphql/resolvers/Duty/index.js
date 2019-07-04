import Duty from '../../../models/duty';

export default {
  Query: {
    duty: (root, args) => {
      return Duty.findOne(args)
        .populate()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    duties: () => {
      return Duty.find({})
        .sort({ dutyId: 'asc' })
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
    addDuty: (root, args) => {
      const newDuty = new Duty({
        dutyId: args.duty.dutyId,
        name: args.duty.name,
        description: args.duty.description
      });

      return newDuty
        .save()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    editDuty: (root, args) => {
      return Duty.findOneAndUpdate(
        {
          dutyId: args.duty.dutyId
        },
        {
          $set: {
            name: args.duty.name,
            description: args.duty.description
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
    deleteDuty: (root, args) => {
      return Duty.findOneAndRemove(args.duty)
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
