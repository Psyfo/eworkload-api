import * as RMethods from './../../../../controllers/activity/research';

export default {
  Query: {
    researchActivity: (root, args) => {
      return RMethods.researchActivity(args.activityId);
    },
    researchActivities: () => {
      return RMethods.researchActivities();
    },
    researchActivitiesByUser: (root, args) => {
      return RMethods.researchActivitiesByUser(args.userId);
    }
  },
  Mutation: {
    // Research
    addResearchActivity: (root, args) => {
      RMethods.addResearchActivity(args.researchActivity);
    },
    editResearchActivity: (root, args) => {
      RMethods.editResearchActivity(args.researchActivity);
    },
    deleteResearchActivity: (root, args) => {
      RMethods.deleteResearchActivity(args.researchActivity);
    }
  }
};
