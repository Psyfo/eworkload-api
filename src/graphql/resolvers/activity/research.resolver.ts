import * as RMethods from '../../../controllers/activity/research.controller';

export default {
  Query: {
    researchActivity: async (root: any, { activityId }: any) => {
      return await RMethods.researchActivity(activityId);
    },
    researchActivities: async () => {
      return await RMethods.researchActivities();
    },
    researchActivitiesByUser: async (root: any, { userId }: any) => {
      return await RMethods.researchActivitiesByUser(userId);
    }
  },
  Mutation: {
    // Research
    addResearchActivity: async (root: any, { activity }: any) => {
      return await RMethods.addResearchActivity(activity);
    },
    editResearchActivity: async (root: any, { activity }: any) => {
      return await RMethods.editResearchActivity(activity);
    },
    deleteResearchActivity: async (root: any, { activity }: any) => {
      return await RMethods.deleteResearchActivity(activity);
    }
  }
};
