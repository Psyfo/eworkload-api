import * as PDMethods from './../../../../controllers/activity/personnel-development';

export default {
  Query: {
    personnelDevelopmentActivity: async (root, { activityId }) => {
      return await PDMethods.personnelDevelopmentActivity(activityId);
    },
    personnelDevelopmentActivities: async () => {
      return await PDMethods.personnelDevelopmentActivities();
    },
    personnelDevelopmentActivitiesByUser: async (root, { userId }) => {
      return await PDMethods.personnelDevelopmentActivitiesByUser(userId);
    }
  },
  Mutation: {
    addPersonnelDevelopmentActivity: async (root, { activity }) => {
      return await PDMethods.addPersonnelDevelopmentActivity(activity);
    },
    editPersonnelDevelopmentActivity: async (root, { activity }) => {
      return await PDMethods.editPersonnelDevelopmentActivity(activity);
    },
    deletePersonnelDevelopmentActivity: async (root, { activity }) => {
      return await PDMethods.deletePersonnelDevelopmentActivity(activity);
    }
  }
};
