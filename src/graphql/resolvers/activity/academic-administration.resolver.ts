import AcademicAdministrationActivityController from '../../../controllers/activity/academic-administration-activity.controller';

export default {
  Query: {
    academicAdministrationActivity: async (root: any, { activityId }: any) => {
      return await AcademicAdministrationActivityController.academicAdministrationActivity(
        activityId
      );
    },
    academicAdministrationActivities: async () => {
      return await AcademicAdministrationActivityController.academicAdministrationActivities();
    },
    academicAdministrationActivitiesByUser: async (
      root: any,
      { userId }: any
    ) => {
      return await AcademicAdministrationActivityController.academicAdministrationActivitiesByUser(
        userId
      );
    }
  },
  Mutation: {
    // AcademicAdministration
    addAcademicAdministrationActivity: async (root: any, { activity }: any) => {
      return await AcademicAdministrationActivityController.createAcademicAdministrationActivity(
        activity
      );
    },
    editAcademicAdministrationActivity: async (
      root: any,
      { activity }: any
    ) => {
      return await AcademicAdministrationActivityController.updateAcademicAdministrationActivity(
        activity
      );
    },
    deleteAcademicAdministrationActivity: async (
      root: any,
      { activity }: any
    ) => {
      return await AcademicAdministrationActivityController.deleteAcademicAdministrationActivity(
        activity
      );
    }
  }
};
