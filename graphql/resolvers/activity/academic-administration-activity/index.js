import * as AAMethods from './../../../../controllers/activity/academic-administration';

export default {
  Query: {
    academicAdministrationActivity: async (root, { activityId }) => {
      return await AAMethods.academicAdministrationActivity(activityId);
    },
    academicAdministrationActivities: async () => {
      return await AAMethods.academicAdministrationActivities();
    },
    academicAdministrationActivitiesByUser: async (root, { userId }) => {
      return await AAMethods.academicAdministrationActivitiesByUser(userId);
    }
  },
  Mutation: {
    // AcademicAdministration
    addAcademicAdministrationActivity: async (root, { activity }) => {
      return await AAMethods.addAcademicAdministrationActivity(activity);
    },
    editAcademicAdministrationActivity: async (root, { activity }) => {
      return await AAMethods.editAcademicAdministrationActivity(activity);
    },
    deleteAcademicAdministrationActivity: async (root, { activity }) => {
      return await AAMethods.deleteAcademicAdministrationActivity(activity);
    }
  }
};
