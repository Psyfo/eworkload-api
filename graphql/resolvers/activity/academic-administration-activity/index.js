import * as AAMethods from './../../../../controllers/activity/academic-administration';

export default {
  Query: {
    academicAdministrationActivity: (root, { activityId }) => {
      return AAMethods.academicAdministrationActivity(activityId);
    },
    academicAdministrationActivities: () => {
      return AAMethods.academicAdministrationActivities();
    },
    academicAdministrationActivitiesByUser: (root, { userId }) => {
      return AAMethods.academicAdministrationActivitiesByUser(userId);
    }
  },
  Mutation: {
    // AcademicAdministration
    addAcademicAdministrationActivity: (root, { activity }) => {
      AAMethods.addAcademicAdministrationActivity(activity);
    },
    editAcademicAdministrationActivity: (root, { activity }) => {
      AAMethods.editAcademicAdministrationActivity(activity);
    },
    deleteAcademicAdministrationActivity: (root, { activity }) => {
      AAMethods.deleteAcademicAdministrationActivity(activity);
    }
  }
};
