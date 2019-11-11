import * as AAMethods from '../../../controllers/activity/academic-administration.controller';

export default {
  Query: {
    academicAdministrationActivity: async (root: any, { activityId }: any) => {
      return await AAMethods.academicAdministrationActivity(activityId);
    },
    academicAdministrationActivities: async () => {
      return await AAMethods.academicAdministrationActivities();
    },
    academicAdministrationActivitiesByUser: async (
      root: any,
      { userId }: any
    ) => {
      return await AAMethods.academicAdministrationActivitiesByUser(userId);
    }
  },
  Mutation: {
    // AcademicAdministration
    addAcademicAdministrationActivity: async (root: any, { activity }: any) => {
      return await AAMethods.addAcademicAdministrationActivity(activity);
    },
    editAcademicAdministrationActivity: async (
      root: any,
      { activity }: any
    ) => {
      return await AAMethods.editAcademicAdministrationActivity(activity);
    },
    deleteAcademicAdministrationActivity: async (
      root: any,
      { activity }: any
    ) => {
      return await AAMethods.deleteAcademicAdministrationActivity(activity);
    }
  }
};
