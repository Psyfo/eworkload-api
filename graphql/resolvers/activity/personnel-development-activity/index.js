import * as PDMethods from './../../../../controllers/activity/personnel-development';

export default {
  Query: {
    personnelDevelopmentActivity: (root, args) => {
      return PDMethods.personnelDevelopmentActivity(args.activityId);
    },
    personnelDevelopmentActivities: () => {
      return PDMethods.personnelDevelopmentActivities();
    },
    personnelDevelopmentActivitiesByUser: (root, args) => {
      return PDMethods.personnelDevelopmentActivitiesByUser(args.userId);
    }
  },
  Mutation: {
    // PublicService
    addPublicServiceActivity: (root, args) => {
      PDMethods.addPublicServiceActivity(args.publicServiceActivity);
    },
    editPublicServiceActivity: (root, args) => {
      PDMethods.editPublicServiceActivity(args.publicServiceActivity);
    },
    deletePublicServiceActivity: (root, args) => {
      PDMethods.deletePublicServiceActivity(args.publicServiceActivity);
    }
  }
};
