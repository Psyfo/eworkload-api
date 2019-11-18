import ResearchActivityController from '../../../controllers/activity/research-activity.controller';

export default {
  Query: {
    researchActivity: async (root: any, { activityId }: any) => {
      return await ResearchActivityController.researchActivity(activityId);
    },
    researchActivities: async () => {
      return await ResearchActivityController.researchActivities();
    },
    researchActivitiesByUser: async (root: any, { userId }: any) => {
      return await ResearchActivityController.researchActivitiesByUser(userId);
    }
  },
  Mutation: {
    // Research
    addResearchActivity: async (root: any, { activity }: any) => {
      return await ResearchActivityController.createResearchActivity(activity);
    },
    editResearchActivity: async (root: any, { activity }: any) => {
      return await ResearchActivityController.updateResearchActivity(activity);
    },
    deleteResearchActivity: async (root: any, { activity }: any) => {
      return await ResearchActivityController.deleteResearchActivity(activity);
    }
  }
};
