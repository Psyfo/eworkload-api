import * as CIMethods from './../../../../controllers/activity/community-instruction';

export default {
  Query: {
    communityInstructionActivity: (root, { activityId }) => {
      return CIMethods.communityInstructionActivity(activityId);
    },
    communityInstructionActivities: () => {
      return CIMethods.communityInstructionActivities();
    },
    communityInstructionActivitiesByUser: (root, { userId }) => {
      return CIMethods.communityInstructionActivitiesByUser(userId);
    }
  },
  Mutation: {
    // Comm-Insruction
    addCommunityInstructionActivity: (root, { activity }) => {
      return CIMethods.addCommunityInstructionActivity(activity);
    },
    editCommunityInstructionActivity: (root, { activity }) => {
      return CIMethods.editCommunityInstructionActivity(activity);
    },
    deleteCommunityInstructionActivity: (root, { activity }) => {
      return CIMethods.deleteCommunityInstructionActivity(activity);
    }
  }
};
