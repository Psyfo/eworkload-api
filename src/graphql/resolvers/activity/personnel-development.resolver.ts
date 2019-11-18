import PersonnelDevelopmentActivityController from '../../../controllers/activity/personnel-development-activity.controller';

export default {
  Query: {
    personnelDevelopmentActivity: async (root: any, { activityId }: any) => {
      return await PersonnelDevelopmentActivityController.personnelDevelopmentActivity(
        activityId
      );
    },
    personnelDevelopmentActivities: async () => {
      return await PersonnelDevelopmentActivityController.personnelDevelopmentActivities();
    },
    personnelDevelopmentActivitiesByUser: async (
      root: any,
      { userId }: any
    ) => {
      return await PersonnelDevelopmentActivityController.personnelDevelopmentActivitiesByUser(
        userId
      );
    }
  },
  Mutation: {
    addPersonnelDevelopmentActivity: async (root: any, { activity }: any) => {
      return await PersonnelDevelopmentActivityController.createPersonnelDevelopmentActivity(
        activity
      );
    },
    editPersonnelDevelopmentActivity: async (root: any, { activity }: any) => {
      return await PersonnelDevelopmentActivityController.updatePersonnelDevelopmentActivity(
        activity
      );
    },
    deletePersonnelDevelopmentActivity: async (
      root: any,
      { activity }: any
    ) => {
      return await PersonnelDevelopmentActivityController.deletePersonnelDevelopmentActivity(
        activity
      );
    }
  }
};
