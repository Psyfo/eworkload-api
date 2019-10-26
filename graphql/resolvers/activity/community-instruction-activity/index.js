import * as CIMethods from './../../../../controllers/activity/community-instruction';

export default {
  Query: {
    communityInstructionActivity: async (root, { activityId }) => {
      return await CIMethods.communityInstructionActivity(activityId);
    },
    communityInstructionActivities: async () => {
      return await CIMethods.communityInstructionActivities();
    },
    communityInstructionActivitiesByUser: async (root, { userId }) => {
      return await CIMethods.communityInstructionActivitiesByUser(userId);
    }
  },
  Mutation: {
    // Comm-Insruction
    addCommunityInstructionActivity: async (root, { activity }) => {
      return await CIMethods.addCommunityInstructionActivity(activity);
    },
    editCommunityInstructionActivity: async (root, { activity }) => {
      return await CIMethods.editCommunityInstructionActivity(activity);
    },
    deleteCommunityInstructionActivity: async (root, { activity }) => {
      return await CIMethods.deleteCommunityInstructionActivity(activity);
    }
  }
};
