import * as CIMethods from '../../../../controllers/community-instruction';

export default {
  Query: {
    communityInstructionActivity: (root, args) => {
      return CIMethods.communityInstructionActivity(args.activityId);
    },
    communityInstructionActivities: () => {
      return CIMethods.communityInstructionActivities();
    },
    communityInstructionActivitiesByUser: (root, args) => {
      return CIMethods.communityInstructionActivitiesByUser(args.userId);
    }
  },
  Mutation: {
    // Comm-Insruction
    addCommunityInstructionActivity: (root, args) => {
      return CIMethods.addCommunityInstructionActivity(
        args.communityInstructionActivity
      );
    },
    editCommunityInstructionActivity: (root, args) => {
      return CIMethods.editCommunityInstructionActivity(
        args.communityInstructionActivity
      );
    },
    deleteCommunityInstructionActivity: (root, args) => {
      return CIMethods.deleteCommunityInstructionActivity(
        args.communityInstructionActivity
      );
    }
  }
};
