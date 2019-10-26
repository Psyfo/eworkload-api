import * as QualificationMethods from '../../../controllers/qualification';

export default {
  Query: {
    qualification: async (root, args) => {
      return await QualificationMethods.qualification(args.qualificationId);
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
    addQualification: async (root, args) => {
      return await QualificationMethods.addQualification(args.qualification);
    },
    editQualification: async (root, args) => {
      return await QualificationMethods.editQualification(args.qualification);
    },
    deleteQualification: async (root, args) => {
      return await QualificationMethods.deleteQualification(args.qualification);
    }
  }
};
