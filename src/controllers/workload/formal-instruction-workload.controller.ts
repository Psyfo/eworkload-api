import * as FormalInstructionMethods from '../activity/formal-instruction.controller';
import * as ModuleMethods from '../module.controller';
import * as BlockMethods from '../block.controller';
import * as OfferingTypeMethods from '../offering-type.controller';
import * as QualificationMethods from '../qualification.controller';

import FormalInstructionWorkload from '../../models/workload/formal-instruction.model';

let initializeFIWorkload = async (userId: string) => {
  // Only one workload record so delete first if it exists
  try {
    await deleteFormalInstructionWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }
  let fiWorkload = new FormalInstructionWorkload({
    userId: userId
  });

  return await fiWorkload.save();
};
let formalInstructionWorkload = async (userId: string) => {
  return await FormalInstructionWorkload.findOne({ userId: userId });
};
let calculateFormalInstructionWorkload = async (userId: string) => {
  // Only one workload record so delete first if it exists
  try {
    await deleteFormalInstructionWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }

  let formalInstructionWorkloads = [];

  let activities: any[] = await FormalInstructionMethods.formalInstructionActivitiesByUser(
    userId
  );

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
    let module = await ModuleMethods._module(
      activity.moduleId,
      activity.blockId,
      activity.offeringTypeId,
      activity.qualificationId
    );
    let block = await BlockMethods.block(activity.blockId);
    let offeringType = await OfferingTypeMethods.offeringType(
      activity.offeringTypeId
    );
    let qualification = await QualificationMethods.qualification(
      activity.qualificationId
    );

    formalInstructionWorkloads.push({
      activity: activity,
      module: module,
      block: block,
      offeringType: offeringType,
      qualification: qualification,
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
  let totalHoursPerUser = 0;

  totalHoursPerUser = await FormalInstructionMethods.formalInstructionTotalHoursPerUser(
    userId
  );
  let percentageOfWorkFocusPerUser = 0;
  percentageOfWorkFocusPerUser = await FormalInstructionMethods.formalInstructionPercentageOfWorkFocusPerUser(
    userId
  );
  let percentageOfAnnualHoursPerUser = 0;
  percentageOfAnnualHoursPerUser = await FormalInstructionMethods.formalInstructionPercentageOfAnnualHoursPerUser(
    userId
  );
  let percentageOfTotalHoursPerUser = 0;
  percentageOfTotalHoursPerUser = await FormalInstructionMethods.formalInstructionPercentageOfTotalHoursPerUser(
    userId
  );

  let formalInstructionWorkload = new FormalInstructionWorkload({
    userId: userId,
    formalInstructionWorkloads: formalInstructionWorkloads,
    totalHoursPerUser: totalHoursPerUser,
    percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  });

  // await formalInstructionWorkload.save();

  console.log('Formal Instruction Workload created');
  return formalInstructionWorkload;
};
let deleteFormalInstructionWorkload = async (userId: string) => {
  return await FormalInstructionWorkload.findOneAndRemove({
    userId: userId
  });
};

export {
  initializeFIWorkload,
  formalInstructionWorkload,
  calculateFormalInstructionWorkload,
  deleteFormalInstructionWorkload
};
