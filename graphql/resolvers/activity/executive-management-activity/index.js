import * as EMMethods from '../../../../controllers/executive-management';

export default {
  Query: {
    executiveManagementActivity: (root, args) => {
      return EMMethods.executiveManagementActivity(args.activityId);
    },
    executiveManagementActivities: () => {
      return EMMethods.executiveManagementActivities();
    },
    executiveManagementActivitiesByUser: (root, args) => {
      return EMMethods.executiveManagementActivitiesByUser(args.userId);
    }
  },
  Mutation: {
    // ExecutiveManagement
    addExecutiveManagementActivity: (root, args) => {
      EMMethods.addExecutiveManagementActivity(
        args.executiveManagementActivity
      );
    },
    editExecutiveManagementActivity: (root, args) => {
      EMMethods.editExecutiveManagementActivity(
        args.executiveManagementActivity
      );
    },
    deleteExecutiveManagementActivity: (root, args) => {
      EMMethods.deleteExecutiveManagementActivity(
        args.executiveManagementActivity
      );
    }
  }
};
