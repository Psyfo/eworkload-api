import * as PSMethods from '../../../../controllers/public-service';

export default {
  Query: {
    publicServiceActivity: (root, args) => {
      return PSMethods.publicServiceActivity(args.activityId);
    },
    publicServiceActivities: () => {
      return PSMethods.publicServiceActivities();
    },
    publicServiceActivitiesByUser: (root, args) => {
      return PSMethods.publicServiceActivitiesByUser(args.userId);
    }
  },
  Mutation: {
    addPublicServiceActivity: (root, args) => {
      PSMethods.addPublicServiceActivity(args.publicServiceActivity);
    },
    editPublicServiceActivity: (root, args) => {
      PSMethods.editPublicServiceActivity(args.publicServiceActivity);
    },
    deletePublicServiceActivity: (root, args) => {
      PSMethods.deletePublicServiceActivity(args.publicServiceActivity);
    }
  }
};
