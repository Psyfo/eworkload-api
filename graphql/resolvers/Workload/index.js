import * as FIWorkloadMethods from '../../../controllers/formal-instruction';

export default {
  Query: {
    baseContact: (root, args) => {
      return FIWorkloadMethods.baseContact(args.activityId);
    },
    coordination: (root, args) => {
      return FIWorkloadMethods.coordination(args.activityId);
    },
    studentSupport: (root, args) => {
      return FIWorkloadMethods.studentSupport(args.activityId);
    },
    preparationTime: (root, args) => {
      return FIWorkloadMethods.preparationTime(args.activityId);
    },
    assessmentSetting: (root, args) => {
      return FIWorkloadMethods.assessmentSetting(args.activityId);
    },
    examMarking: (root, args) => {
      return FIWorkloadMethods.examMarking(args.activityId);
    },
    courseworkMarking: (root, args) => {
      return FIWorkloadMethods.courseworkMarking(args.activityId);
    },
    feedback: (root, args) => {
      return FIWorkloadMethods.feedback(args.activityId);
    },
    formativeAssessment: (root, args) => {
      return FIWorkloadMethods.formativeAssessment(args.activityId);
    },
    moderation: (root, args) => {
      return FIWorkloadMethods.moderation(args.activityId);
    },
    other: (root, args) => {
      return FIWorkloadMethods.other(args.activityId);
    },
    total: (root, args) => {
      return FIWorkloadMethods.total(args.activityId);
    },
    sumTotal: (root, args) => {
      return FIWorkloadMethods.sumTotal(args.userId);
    },
    teachingFocus: (root, args) => {
      return FIWorkloadMethods.teachingFocus(args.userId);
    },
    percentageOfFocus: (root, args) => {
      return FIWorkloadMethods.percentageOfFocus(args.activityId);
    },
    percentageOfTotal: (root, args) => {
      return FIWorkloadMethods.percentageOfTotal(args.activityId);
    },
    sumPercentageOfTotal: (root, args) => {
      return FIWorkloadMethods.sumPercentageOfTotal(args.userId);
    },
    studentsEnrolled: (root, args) => {
      return FIWorkloadMethods.studentsEnrolled(args.activityId);
    },
    hemis: (root, args) => {
      return FIWorkloadMethods.hemis(args.userId);
    }
  },
  Mutation: {}
};
