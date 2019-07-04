import WorkFocus from '../../../models/work-focus';
import { introspectSchema } from 'graphql-tools';

export default {
  Query: {
    workFocus: (root, args) => {
      return WorkFocus.findOne({ name: args.name })
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    workFocuses: () => {
      return WorkFocus.find({})
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  Mutation: {
    addWorkFocus: (root, args) => {
      const newWorkFocus = new WorkFocus({
        name: args.name,
        teachingRatio: parseInt(args.teachingRatio),
        researchRatio: parseInt(args.researchRatio),
        serviceRatio: parseInt(args.serviceRatio)
      });

      newWorkFocus
        .save()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    editWorkFocus: (root, args) => {
      return WorkFocus.findOneAndUpdate(
        {
          name: args.name
        },
        {
          $set: {
            name: args.name,
            teachingRatio: args.teachingRatio,
            researchRatio: args.researchRatio,
            serviceRatio: args.serviceRatio
          }
        }
      )
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteWorkFocus: (root, args) => {}
  }
};
