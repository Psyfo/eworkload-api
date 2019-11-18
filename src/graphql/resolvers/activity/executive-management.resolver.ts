import ExecutiveManagementActivityController from '../../../controllers/activity/executive-management-activity.controller';

export default {
  Query: {
    executiveManagementActivity: async (root: any, { activityId }: any) => {
      return await ExecutiveManagementActivityController.executiveManagementActivity(
        activityId
      );
    },
    executiveManagementActivities: async () => {
      return await ExecutiveManagementActivityController.executiveManagementActivities();
    },
    executiveManagementActivitiesByUser: async (root: any, { userId }: any) => {
      return await ExecutiveManagementActivityController.executiveManagementActivitiesByUser(
        userId
      );
    }
  },
  Mutation: {
    addExecutiveManagementActivity: async (root: any, { activity }: any) => {
      return await ExecutiveManagementActivityController.createExecutiveManagementActivity(
        activity
      );
    },
    editExecutiveManagementActivity: async (root: any, { activity }: any) => {
      return await ExecutiveManagementActivityController.updateExecutiveManagementActivity(
        activity
      );
    },
    deleteExecutiveManagementActivity: async (root: any, { activity }: any) => {
      return await ExecutiveManagementActivityController.deleteExecutiveManagementActivity(
        activity
      );
    }
  }
};
