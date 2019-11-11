import * as QualificationMethods from '../../controllers/qualification.controller';

export default {
  Query: {
    qualification: async (root: any, { qualificationId }: any) => {
      return await QualificationMethods.qualification(qualificationId);
    },
    qualifications: async () => {
      return await QualificationMethods.qualifications();
    },
    qualificationsPostgraduate: async () => {
      return await QualificationMethods.qualificationsPostgraduate();
    },
    qualificationsNoEnrollment: async () => {
      return await QualificationMethods.qualificationsNoEnrollment();
    }
  },
  Mutation: {
    addQualification: async (root: any, { qualification }: any) => {
      return await QualificationMethods.addQualification(qualification);
    },
    editQualification: async (root: any, { qualification }: any) => {
      return await QualificationMethods.editQualification(qualification);
    },
    deleteQualification: async (root: any, { qualification }: any) => {
      return await QualificationMethods.deleteQualification(qualification);
    }
  }
};
