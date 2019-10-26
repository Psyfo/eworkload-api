import * as PSMethods from './../../../../controllers/activity/public-service';

export default {
  Query: {
    publicServiceActivity: async (root, { activityId }) => {
      return await PSMethods.publicServiceActivity(activityId);
    },
    publicServiceActivities: async () => {
      return await PSMethods.publicServiceActivities();
    },
    publicServiceActivitiesByUser: async (root, { userId }) => {
      return await PSMethods.publicServiceActivitiesByUser(userId);
    }
  },
  Mutation: {
    addPublicServiceActivity: async (root, { activity }) => {
      return await PSMethods.addPublicServiceActivity(activity);
    },
    editPublicServiceActivity: async (root, { activity }) => {
      return await PSMethods.editPublicServiceActivity(activity);
    },
    deletePublicServiceActivity: async (root, { activity }) => {
      return await PSMethods.deletePublicServiceActivity(activity);
    }
  }
};
