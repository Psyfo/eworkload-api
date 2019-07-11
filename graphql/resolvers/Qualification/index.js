import * as QualificationMethods from '../../../controllers/qualification';

export default {
  Query: {
    qualification: (root, args) => {
      return QualificationMethods.qualification(args.qualificationId);
    },
    qualifications: () => {
      return QualificationMethods.qualifications();
    },
    qualificationsNoEnrollment: async () => {
      return QualificationMethods.qualificationsNoEnrollment();
    }
  },
  Mutation: {
    addQualification: (root, args) => {
      return QualificationMethods.addQualification(args.qualification);
    },
    editQualification: (root, args) => {
      return QualificationMethods.editQualification(args.qualification);
    },
    deleteQualification: (root, args) => {
      return QualificationMethods.deleteQualification(args.qualification);
    }
  }
};
