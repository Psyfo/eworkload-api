import { gql } from 'apollo-server-core';

export default gql`
  type FormalInstructionWorkload {
    baseContact: Int
    coordination: Int
    studentSupport: Int
    preparationTime: Int
    assessmentSetting: Int
    examMarking: Int
    courseworkMarking: Int
    feedback: Int
    formativeAssessment: Int
    moderation: Int
    other: Int
    total: Int
    percentageOfFormalInstruction: Int
    percentageOfTotal: Int
    sumFormalInstruction: Int
  }

  type HemisData {
    activity: FormalInstructionActivity
    baseContact: Int
    other: Int
    total: Int
    sumTotal: Int
    percentageOfTotal: Int
    studentsEnrolled: Int
  }

  type Query {
    baseContact(activityId: String): Int
    coordination(activityId: String): Int
    studentSupport(activityId: String): Int
    preparationTime(activityId: String): Int
    assessmentSetting(activityId: String): Int
    examMarking(activityId: String): Int
    courseworkMarking(activityId: String): Int
    feedback(activityId: String): Int
    formativeAssessment(activityId: String): Int
    moderation(activityId: String): Int
    other(activityId: String): Int
    total(activityId: String): Int
    sumTotal(userId: String): Int
    teachingFocus(userId: String): Int
    percentageOfTotal(activityId: String): Int
    percentageOfFocus(activityId: String): Int
    sumPercentageOfTotal(userId: String): Int
    studentsEnrolled(activityId: String): Int
    hemis(userId: String): [HemisData]
  }

  #   type Mutation {

  #   }
`;
