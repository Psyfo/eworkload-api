import * as EMMethods from './../../../../controllers/activity/executive-management';

export default {
  Query: {
    executiveManagementActivity: (root, { activityId }) => {
      return EMMethods.executiveManagementActivity(activityId);
    },
    executiveManagementActivities: () => {
      return EMMethods.executiveManagementActivities();
    },
    executiveManagementActivitiesByUser: (root, { userId }) => {
      return EMMethods.executiveManagementActivitiesByUser(userId);
    }
  },
  Mutation: {
    // ExecutiveManagement
    addExecutiveManagementActivity: (root, { activity }) => {
      EMMethods.addExecutiveManagementActivity(activity);
    },
    editExecutiveManagementActivity: (root, { activity }) => {
      EMMethods.editExecutiveManagementActivity(activity);
    },
    deleteExecutiveManagementActivity: (root, { activity }) => {
      EMMethods.deleteExecutiveManagementActivity(activity);
    }
  }
};
