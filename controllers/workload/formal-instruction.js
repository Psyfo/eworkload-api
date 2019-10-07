import * as FormalInstructionMethods from './../activity/formal-instruction';

import FormalInstructionActivity from './../../models/activity/formal-instruction-activity';
import FormalInstructionWorkload from './../../models/workload/formal-instruction';

let formalInstructionWorkload = async userId => {
  return await FormalInstructionWorkload.find({ userId: userId });
};

let addFormalInstructionWorkload = async userId => {
  // Only one workload record so delete first if it exists
  try {
    await deleteFormalInstructionWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }

  let formalInstructionWorkloads = [];

  let activities = await FormalInstructionActivity.find({
    userId: userId
  })
    .populate('module')
    .populate('block')
    .populate('offeringType')
    .populate('qualification');

  for (let activity of activities) {
    let studentsEnrolled = await FormalInstructionMethods.formalInstructionStudentsEnrolled(
      activity.activityId
    );
    let baseContactHours = await FormalInstructionMethods.formalInstructionBaseContactHours(
      activity.activityId
    );
    let coordinationHours = await FormalInstructionMethods.formalInstructionCoordinationHours(
      activity.activityId
    );
    let studentSupportHours = await FormalInstructionMethods.formalInstructionStudentSupportHours(
      activity.activityId
    );
    let preparationTimeHours = await FormalInstructionMethods.formalInstructionPreparationTimeHours(
      activity.activityId
    );
    let assessmentSettingHours = await FormalInstructionMethods.formalInstructionAssessmentSettingHours(
      activity.activityId
    );
    let examMarkingHours = await FormalInstructionMethods.formalInstructionExamMarkingHours(
      activity.activityId
    );
    let courseworkMarkingHours = await FormalInstructionMethods.formalInstructionCourseworkMarkingHours(
      activity.activityId
    );
    let feedbackHours = await FormalInstructionMethods.formalInstructionFeedbackHours(
      activity.activityId
    );
    let formativeAssessmentHours = await FormalInstructionMethods.formalInstructionFormativeAssessmentHours(
      activity.activityId
    );
    let moderationHours = await FormalInstructionMethods.formalInstructionModerationHours(
      activity.activityId
    );
    let otherHoursPerActivity = await FormalInstructionMethods.formalInstructionOtherHoursPerActivity(
      activity.activityId
    );
    let totalHoursPerActivity = await FormalInstructionMethods.formalInstructionTotalHoursPerActivity(
      activity.activityId
    );
    let percentageOfWorkFocusPerActivity = await FormalInstructionMethods.formalInstructionPercentageOfWorkFocusPerActivity(
      activity.activityId
    );
    let percentageOfAnnualHoursPerActivity = await FormalInstructionMethods.formalInstructionPercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
    let percentageOfTotalHoursPerActivity = await FormalInstructionMethods.formalInstructionPercentageOfTotalHoursPerActivity(
      activity.activityId
    );

    formalInstructionWorkloads.push({
      activity: activity,
      studentsEnrolled: studentsEnrolled,
      baseContactHours: baseContactHours,
      coordinationHours: coordinationHours,
      studentSupportHours: studentSupportHours,
      preparationTimeHours: preparationTimeHours,
      assessmentSettingHours: assessmentSettingHours,
      examMarkingHours: examMarkingHours,
      courseworkMarkingHours: courseworkMarkingHours,
      feedbackHours: feedbackHours,
      formativeAssessmentHours: formativeAssessmentHours,
      moderationHours: moderationHours,
      otherHoursPerActivity: otherHoursPerActivity,
      totalHoursPerActivity: totalHoursPerActivity,
      percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
      percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
      percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
    });
  }
  let totalHoursPerUser = await FormalInstructionMethods.formalInstructionTotalHoursPerUser(
    userId
  );
  let percentageOfWorkFocusPerUser = await FormalInstructionMethods.formalInstructionPercentageOfWorkFocusPerUser(
    userId
  );
  let percentageOfAnnualHoursPerUser = await FormalInstructionMethods.formalInstructionPercentageOfAnnualHoursPerUser(
    userId
  );
  let percentageOfTotalHoursPerUser = await FormalInstructionMethods.formalInstructionPercentageOfTotalHoursPerUser(
    userId
  );

  return {
    userId: userId,
    formalInstructionWorkloads: formalInstructionWorkloads,
    totalHoursPerUser: totalHoursPerUser,
    percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  };
};

let deleteFormalInstructionWorkload = async userId => {
  return await FormalInstructionWorkload.findOneAndRemove({
    userId: userId
  });
};

export {
  formalInstructionWorkload,
  addFormalInstructionWorkload,
  deleteFormalInstructionWorkload
};
