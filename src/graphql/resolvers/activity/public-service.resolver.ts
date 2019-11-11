import * as PSMethods from '../../../controllers/activity/public-service.controller';

export default {
  Query: {
    publicServiceActivity: async (root: any, { activityId }: any) => {
      return await PSMethods.publicServiceActivity(activityId);
    },
    publicServiceActivities: async () => {
      return await PSMethods.publicServiceActivities();
    },
    publicServiceActivitiesByUser: async (root: any, { userId }: any) => {
      return await PSMethods.publicServiceActivitiesByUser(userId);
    }
  },
  Mutation: {
    addPublicServiceActivity: async (root: any, { activity }: any) => {
      return await PSMethods.addPublicServiceActivity(activity);
    },
    editPublicServiceActivity: async (root: any, { activity }: any) => {
      return await PSMethods.editPublicServiceActivity(activity);
    },
    deletePublicServiceActivity: async (root: any, { activity }: any) => {
      return await PSMethods.deletePublicServiceActivity(activity);
    }
  }
};
