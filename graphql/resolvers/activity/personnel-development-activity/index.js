import * as PDMethods from './../../../../controllers/activity/personnel-development';

export default {
  Query: {
    personnelDevelopmentActivity: (root, activityId) => {
      return PDMethods.personnelDevelopmentActivity(activityId);
    },
    personnelDevelopmentActivities: () => {
      return PDMethods.personnelDevelopmentActivities();
    },
    personnelDevelopmentActivitiesByUser: (root, { userId }) => {
      return PDMethods.personnelDevelopmentActivitiesByUser(userId);
    }
  },
  Mutation: {
    addPersonnelDevelopmentActivity: (root, { activity }) => {
      PDMethods.addPersonnelDevelopmentActivity(activity);
    },
    editPersonnelDevelopmentActivity: (root, { activity }) => {
      PDMethods.editPersonnelDevelopmentActivity(activity);
    },
    deletePersonnelDevelopmentActivity: (root, { activity }) => {
      PDMethods.deletePersonnelDevelopmentActivity(activity);
    }
  }
};
