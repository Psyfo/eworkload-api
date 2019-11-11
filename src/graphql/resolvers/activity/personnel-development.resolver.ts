import * as PDMethods from '../../../controllers/activity/personnel-development.controller';

export default {
  Query: {
    personnelDevelopmentActivity: async (root: any, { activityId }: any) => {
      return await PDMethods.personnelDevelopmentActivity(activityId);
    },
    personnelDevelopmentActivities: async () => {
      return await PDMethods.personnelDevelopmentActivities();
    },
    personnelDevelopmentActivitiesByUser: async (
      root: any,
      { userId }: any
    ) => {
      return await PDMethods.personnelDevelopmentActivitiesByUser(userId);
    }
  },
  Mutation: {
    addPersonnelDevelopmentActivity: async (root: any, { activity }: any) => {
      return await PDMethods.addPersonnelDevelopmentActivity(activity);
    },
    editPersonnelDevelopmentActivity: async (root: any, { activity }: any) => {
      return await PDMethods.editPersonnelDevelopmentActivity(activity);
    },
    deletePersonnelDevelopmentActivity: async (
      root: any,
      { activity }: any
    ) => {
      return await PDMethods.deletePersonnelDevelopmentActivity(activity);
    }
  }
};
