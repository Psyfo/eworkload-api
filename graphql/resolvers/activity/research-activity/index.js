import * as RMethods from './../../../../controllers/activity/research';

export default {
  Query: {
    researchActivity: async (root, { activityId }) => {
      return await RMethods.researchActivity(activityId);
    },
    researchActivities: async () => {
      return await RMethods.researchActivities();
    },
    researchActivitiesByUser: async (root, { userId }) => {
      return await RMethods.researchActivitiesByUser(userId);
    }
  },
  Mutation: {
    // Research
    addResearchActivity: async (root, { activity }) => {
      return await RMethods.addResearchActivity(activity);
    },
    editResearchActivity: async (root, { activity }) => {
      return await RMethods.editResearchActivity(activity);
    },
    deleteResearchActivity: async (root, { activity }) => {
      return await RMethods.deleteResearchActivity(activity);
    }
  }
};
