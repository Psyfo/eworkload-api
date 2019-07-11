import * as AAMethods from '../../../../controllers/academic-administration';

export default {
  Query: {
    academicAdministrationActivity: (root, args) => {
      return AAMethods.academicAdministrationActivity(args.activityId);
    },
    academicAdministrationActivities: () => {
      return AAMethods.academicAdministrationActivities();
    },
    academicAdministrationActivitiesByUser: (root, args) => {
      return AAMethods.academicAdministrationActivitiesByUser(args.userId);
    }
  },
  Mutation: {
    // AcademicAdministration
    addAcademicAdministrationActivity: (root, args) => {
      AAMethods.addAcademicAdministrationActivity(
        args.academicAdministrationActivity
      );
    },
    editAcademicAdministrationActivity: (root, args) => {
      AAMethods.editAcademicAdministrationActivity(
        args.academicAdministrationActivity
      );
    },
    deleteAcademicAdministrationActivity: (root, args) => {
      AAMethods.deleteAcademicAdministrationActivity(
        args.academicAdministrationActivity
      );
    }
  }
};
