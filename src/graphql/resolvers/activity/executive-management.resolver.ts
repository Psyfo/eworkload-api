import * as EMMethods from '../../../controllers/activity/executive-management.controller';

export default {
  Query: {
    executiveManagementActivity: async (root: any, { activityId }: any) => {
      return await EMMethods.executiveManagementActivity(activityId);
    },
    executiveManagementActivities: async () => {
      return await EMMethods.executiveManagementActivities();
    },
    executiveManagementActivitiesByUser: async (root: any, { userId }: any) => {
      return await EMMethods.executiveManagementActivitiesByUser(userId);
    }
  },
  Mutation: {
    addExecutiveManagementActivity: async (root: any, { activity }: any) => {
      return await EMMethods.addExecutiveManagementActivity(activity);
    },
    editExecutiveManagementActivity: async (root: any, { activity }: any) => {
      return await EMMethods.editExecutiveManagementActivity(activity);
    },
    deleteExecutiveManagementActivity: async (root: any, { activity }: any) => {
      return await EMMethods.deleteExecutiveManagementActivity(activity);
    }
  }
};
