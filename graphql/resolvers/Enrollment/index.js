import * as EnrollmentMethods from '../../../controllers/enrollment';

export default {
  Query: {
    enrollment: async (root, args) => {
      return await EnrollmentMethods.enrollment(
        args.enrollmentYear,
        args.qualificationId
      );
    },
    enrollments: async () => {
      return await EnrollmentMethods.enrollments();
    },
    enrollmentsByYear: async (root, args) => {
      return await EnrollmentMethods.enrollmentsByYear(args.enrollmentYear);
    },
    enrollmentsByQualification: async (root, args) => {
      return await EnrollmentMethods.enrollmentsByQualification(
        args.qualificationId
      );
    }
  },
  Mutation: {
    addEnrollment: async (root, args) => {
      return await EnrollmentMethods.addEnrollment(args.enrollment);
    },
    editEnrollment: async (root, args) => {
      return await EnrollmentMethods.editEnrollment(args.enrollments);
    },
    deleteEnrollment: async (root, args) => {
      return await EnrollmentMethods.deleteEnrollment(args.enrollments);
    }
  }
};
