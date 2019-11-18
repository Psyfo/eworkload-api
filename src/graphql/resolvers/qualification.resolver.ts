import QualificationController from '../../controllers/qualification.controller';

export default {
  Query: {
    qualification: async (root: any, { qualificationId }: any) => {
      return await QualificationController.qualification(qualificationId);
    },
    qualifications: async () => {
      return await QualificationController.qualifications();
    },
    qualificationsByLevel: async (root: any, { level }: any) => {
      return await QualificationController.qualificationsByLevel(level);
    },
    qualificationsUnenrolled: async () => {
      return await QualificationController.qualificationsUnenrolled();
    }
  },
  Mutation: {
    addQualification: async (root: any, { qualification }: any) => {
      return await QualificationController.createQualification(qualification);
    },
    editQualification: async (root: any, { qualification }: any) => {
      return await QualificationController.updateQualification(qualification);
    },
    deleteQualification: async (root: any, { qualification }: any) => {
      return await QualificationController.deleteQualification(qualification);
    }
  }
};
