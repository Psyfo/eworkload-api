import * as PSMethods from './../../../../controllers/activity/public-service';

export default {
  Query: {
    publicServiceActivity: (root, { activityId }) => {
      return PSMethods.publicServiceActivity(activityId);
    },
    publicServiceActivities: () => {
      return PSMethods.publicServiceActivities();
    },
    publicServiceActivitiesByUser: (root, { userId }) => {
      return PSMethods.publicServiceActivitiesByUser(userId);
    }
  },
  Mutation: {
    addPublicServiceActivity: (root, { activity }) => {
      PSMethods.addPublicServiceActivity(activity);
    },
    editPublicServiceActivity: (root, { activity }) => {
      PSMethods.editPublicServiceActivity(activity);
    },
    deletePublicServiceActivity: (root, { activity }) => {
      PSMethods.deletePublicServiceActivity(activity);
    }
  }
};
