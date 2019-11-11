import * as EnrollmentMethods from '../../controllers/enrollment.controller';

export default {
  Query: {
    enrollment: async (root: any, { enrollmentYear, qualificationId }: any) => {
      return await EnrollmentMethods.enrollment(
        enrollmentYear,
        qualificationId
      );
    },
    enrollments: async () => {
      return await EnrollmentMethods.enrollments();
    },
    enrollmentsByYear: async (root: any, { enrollmentYear }: any) => {
      return await EnrollmentMethods.enrollmentsByYear(enrollmentYear);
    },
    enrollmentsByQualification: async (root: any, { qualificationId }: any) => {
      return await EnrollmentMethods.enrollmentsByQualification(
        qualificationId
      );
    }
  },
  Mutation: {
    addEnrollment: async (root: any, { enrollment }: any) => {
      return await EnrollmentMethods.addEnrollment(enrollment);
    },
    editEnrollment: async (root: any, { enrollment }: any) => {
      return await EnrollmentMethods.editEnrollment(enrollment);
    },
    deleteEnrollment: async (root: any, { enrollment }: any) => {
      return await EnrollmentMethods.deleteEnrollment(enrollment);
    }
  }
};
