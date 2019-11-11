import * as CIMethods from '../../../controllers/activity/community-instruction.controller';

export default {
  Query: {
    communityInstructionActivity: async (root: any, { activityId }: any) => {
      return await CIMethods.communityInstructionActivity(activityId);
    },
    communityInstructionActivities: async () => {
      return await CIMethods.communityInstructionActivities();
    },
    communityInstructionActivitiesByUser: async (
      root: any,
      { userId }: any
    ) => {
      return await CIMethods.communityInstructionActivitiesByUser(userId);
    }
  },
  Mutation: {
    addCommunityInstructionActivity: async (root: any, { activity }: any) => {
      return await CIMethods.addCommunityInstructionActivity(activity);
    },
    editCommunityInstructionActivity: async (root: any, { activity }: any) => {
      return await CIMethods.editCommunityInstructionActivity(activity);
    },
    deleteCommunityInstructionActivity: async (
      root: any,
      { activity }: any
    ) => {
      return await CIMethods.deleteCommunityInstructionActivity(activity);
    }
  }
};
