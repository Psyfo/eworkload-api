import CommunityInstructionActivityController from '../../../controllers/activity/community-instruction-activity.controller';

export default {
  Query: {
    communityInstructionActivity: async (root: any, { activityId }: any) => {
      return await CommunityInstructionActivityController.communityInstructionActivity(
        activityId
      );
    },
    communityInstructionActivities: async () => {
      return await CommunityInstructionActivityController.communityInstructionActivities();
    },
    communityInstructionActivitiesByUser: async (
      root: any,
      { userId }: any
    ) => {
      return await CommunityInstructionActivityController.communityInstructionActivitiesByUser(
        userId
      );
    }
  },
  Mutation: {
    addCommunityInstructionActivity: async (root: any, { activity }: any) => {
      return await CommunityInstructionActivityController.createCommunityInstructionActivity(
        activity
      );
    },
    editCommunityInstructionActivity: async (root: any, { activity }: any) => {
      return await CommunityInstructionActivityController.updateCommunityInstructionActivity(
        activity
      );
    },
    deleteCommunityInstructionActivity: async (
      root: any,
      { activity }: any
    ) => {
      return await CommunityInstructionActivityController.deleteCommunityInstructionActivity(
        activity
      );
    }
  }
};
