import * as RMethods from './../../../../controllers/activity/research';

export default {
  Query: {
    researchActivity: (root, { activityId }) => {
      return RMethods.researchActivity(activityId);
    },
    researchActivities: () => {
      return RMethods.researchActivities();
    },
    researchActivitiesByUser: (root, { userId }) => {
      return RMethods.researchActivitiesByUser(userId);
    }
  },
  Mutation: {
    // Research
    addResearchActivity: (root, { activity }) => {
      RMethods.addResearchActivity(activity);
    },
    editResearchActivity: (root, { activity }) => {
      RMethods.editResearchActivity(activity);
    },
    deleteResearchActivity: (root, { activity }) => {
      RMethods.deleteResearchActivity(activity);
    }
  }
};
