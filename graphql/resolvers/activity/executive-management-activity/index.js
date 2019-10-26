import * as EMMethods from './../../../../controllers/activity/executive-management';

export default {
  Query: {
    executiveManagementActivity: async (root, { activityId }) => {
      return await EMMethods.executiveManagementActivity(activityId);
    },
    executiveManagementActivities: async () => {
      return await EMMethods.executiveManagementActivities();
    },
    executiveManagementActivitiesByUser: async (root, { userId }) => {
      return await EMMethods.executiveManagementActivitiesByUser(userId);
    }
  },
  Mutation: {
    // ExecutiveManagement
    addExecutiveManagementActivity: async (root, { activity }) => {
      return await EMMethods.addExecutiveManagementActivity(activity);
    },
    editExecutiveManagementActivity: async (root, { activity }) => {
      return await EMMethods.editExecutiveManagementActivity(activity);
    },
    deleteExecutiveManagementActivity: async (root, { activity }) => {
      return await EMMethods.deleteExecutiveManagementActivity(activity);
    }
  }
};
