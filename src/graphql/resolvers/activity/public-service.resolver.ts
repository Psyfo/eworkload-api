import PublicServiceActivityController from '../../../controllers/activity/public-service-activity.controller';

export default {
  Query: {
    publicServiceActivity: async (root: any, { activityId }: any) => {
      return await PublicServiceActivityController.publicServiceActivity(
        activityId
      );
    },
    publicServiceActivities: async () => {
      return await PublicServiceActivityController.publicServiceActivities();
    },
    publicServiceActivitiesByUser: async (root: any, { userId }: any) => {
      return await PublicServiceActivityController.publicServiceActivitiesByUser(
        userId
      );
    }
  },
  Mutation: {
    addPublicServiceActivity: async (root: any, { activity }: any) => {
      return await PublicServiceActivityController.createPublicServiceActivity(
        activity
      );
    },
    editPublicServiceActivity: async (root: any, { activity }: any) => {
      return await PublicServiceActivityController.updatePublicServiceActivity(
        activity
      );
    },
    deletePublicServiceActivity: async (root: any, { activity }: any) => {
      return await PublicServiceActivityController.deletePublicServiceActivity(
        activity
      );
    }
  }
};
