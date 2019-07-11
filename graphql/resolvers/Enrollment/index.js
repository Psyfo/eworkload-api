import * as EnrollmentMethods from '../../../controllers/enrollment';

export default {
  Query: {
    enrollment: (root, args) => {
      return EnrollmentMethods.enrollment(
        args.enrollmentYear,
        args.qualificationId
      );
    },
    enrollments: () => {
      return EnrollmentMethods.enrollments();
    },
    enrollmentsByYear: (root, args) => {
      return EnrollmentMethods.enrollmentsByYear(args.enrollmentYear);
    },
    enrollmentsByQualification: (root, args) => {
      return EnrollmentMethods.enrollmentsByQualification(args.qualificationId);
    }
  },
  Mutation: {
    addEnrollment: (root, args) => {
      return EnrollmentMethods.addEnrollment(args.enrollment);
    },
    editEnrollment: (root, args) => {
      return EnrollmentMethods.editEnrollment(args.enrollments);
    },
    deleteEnrollment: (root, args) => {
      return EnrollmentMethods.deleteEnrollment(args.enrollments);
    }
  }
};
