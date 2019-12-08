import EnrollmentController from '../../controllers/enrollment.controller';

export default {
  Query: {
    enrollment: async (root: any, { id }: any) => {
      return await EnrollmentController.enrollment(id);
    },
    enrollments: async () => {
      return await EnrollmentController.enrollments();
    },
    enrollmentsByYear: async (root: any, { enrollmentYear }: any) => {
      return await EnrollmentController.enrollmentsByYear(enrollmentYear);
    },
    enrollmentsByQualification: async (root: any, { qualificationId }: any) => {
      return await EnrollmentController.enrollmentsByQualification(
        qualificationId
      );
    }
  },
  Mutation: {
    addEnrollment: async (root: any, { enrollment }: any) => {
      return await EnrollmentController.createEnrollment(enrollment);
    },
    editEnrollment: async (root: any, { enrollment }: any) => {
      return await EnrollmentController.updateEnrollment(enrollment);
    },
    deleteEnrollment: async (root: any, { enrollment }: any) => {
      return await EnrollmentController.deleteEnrollment(enrollment);
    }
  }
};
