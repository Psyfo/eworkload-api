import FormalInstructionActivity from '../../models/activity/formal-instruction-activity';
import * as EnrollmentMethods from '../enrollment';
import * as ModuleMethods from '../module';
import * as WorkFocusMethods from './../work-focus';
import parameters from './../../config/parameters';

let year = new Date().getFullYear().toString();

// FI METHODS
let formalInstructionActivity = async activityId => {
  return await FormalInstructionActivity.findOne({ activityId: activityId })
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate('module')
    .populate('moderator');
};
let formalInstructionActivities = async () => {
  return await FormalInstructionActivity.find({})
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate('module');
};
let formalInstructionActivitiesByUser = async userId => {
  return await FormalInstructionActivity.find({ userId: userId })
    .populate('user')
    .populate('coordinator')
    .populate('moderator')
    .populate('duty')
    .populate({
      path: 'module',
      model: 'Module',
      populate: { path: 'block', model: 'Block' }
    })
    .populate('moderator');
};
let addFormalInstructionActivity = async activity => {
  const newFormalInstructionActivity = await new FormalInstructionActivity(
    activity
  );

  return newFormalInstructionActivity.save();
};
let editFormalInstructionActivity = async activity => {
  return await FormalInstructionActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};
let deleteFormalInstructionActivity = async activity => {
  return await FormalInstructionActivity.findOneAndRemove(activity);
};
let formalInstructionLectureWeeks = async activityId => {
  let activity = await formalInstructionActivity(activityId);

  let lectureWeeks;
  if (activity.blockId === parameters.semester_1 || parameters.semester_1) {
    lectureWeeks = parameters.lecture_weeks_semester;
  } else if (activity.blockId === parameters.annual) {
    lectureWeeks = parameters.lecture_weeks_annual;
  }

  return lectureWeeks;
};
let formalInstructionStudentsEnrolled = async activityId => {
  let activity = await formalInstructionActivity(activityId);
  let module = await ModuleMethods.module(
    activity.moduleId,
    activity.blockId,
    activity.offeringTypeId,
    activity.qualificationId
  );
  let enrollment = await EnrollmentMethods.enrollment(
    year,
    activity.qualificationId
  );

  let students = 0;
  if (module.studyPeriod === '1') {
    students = enrollment.firstYearEstimated;
  } else {
    students =
      (enrollment.secondYearEstimated + enrollment.thirdYearEstimated) / 2;
  }
  return students;
};

// WORKLOAD METHODS
let formalInstructionBaseContactHours = async activityId => {
  let activity = await formalInstructionActivity(activityId);
  let module = await ModuleMethods.module(
    activity.moduleId,
    activity.blockId,
    activity.offeringTypeId,
    activity.qualificationId
  );
  let students = await formalInstructionStudentsEnrolled(activityId);
  let lectureWeeks = await formalInstructionLectureWeeks(activityId);

  let repeats = Math.round(students / parameters.max_venue_size);

  return Math.round(
    ((module.credits / 4) * lectureWeeks * repeats) / module.groupSize
  );
};
let formalInstructionCoordinationHours = async activityId => {
  let activity = await formalInstructionActivity(activityId);
  let module = await ModuleMethods.module(
    activity.moduleId,
    activity.blockId,
    activity.offeringTypeId,
    activity.qualificationId
  );
  let students = await formalInstructionStudentsEnrolled(activityId);

  let coordination = 0;
  if (activity.userId === module.coordinatorId) {
    coordination = Math.round(((students - 100) / 40) * (module.credits / 10));
  }

  return coordination;
};
let formalInstructionStudentSupportHours = async activityId => {
  let activity = await formalInstructionActivity(activityId);
  let module = await ModuleMethods.module(
    activity.moduleId,
    activity.blockId,
    activity.offeringTypeId,
    activity.qualificationId
  );
  let students = await formalInstructionStudentsEnrolled(activityId);
  let lectureWeeks = await formalInstructionLectureWeeks(activityId);

  return Math.round((0.1 * students * module.credits) / lectureWeeks);
};
let formalInstructionPreparationTimeHours = async activityId => {
  let activity = await formalInstructionActivity(activityId);
  let module = await ModuleMethods.module(
    activity.moduleId,
    activity.blockId,
    activity.offeringTypeId,
    activity.qualificationId
  );
  let students = await formalInstructionStudentsEnrolled(activityId);
  let repeats = Math.round(students / parameters.max_venue_size);
  let baseContactHours = await formalInstructionBaseContactHours(activityId);
  return Math.round(
    (baseContactHours / repeats) * (parseInt(module.nqfLevel) - 3)
  );
};
let formalInstructionAssessmentSettingHours = async activityId => {
  let activity = await formalInstructionActivity(activityId);
  let module = await ModuleMethods.module(
    activity.moduleId,
    activity.blockId,
    activity.offeringTypeId,
    activity.qualificationId
  );
  let lectureWeeks = await formalInstructionLectureWeeks(activityId);

  return Math.round(
    ((10 * module.credits) / lectureWeeks) * (parseInt(module.nqfLevel) - 3)
  );
};
let formalInstructionExamMarkingHours = async activityId => {
  let activity = await formalInstructionActivity(activityId);
  let module = await ModuleMethods.module(
    activity.moduleId,
    activity.blockId,
    activity.offeringTypeId,
    activity.qualificationId
  );
  let students = await formalInstructionStudentsEnrolled(activityId);
  let lectureWeeks = await formalInstructionLectureWeeks(activityId);

  // let repeats = Math.round(students / parameters.max_venue_size);
  return Math.round(
    0.25 * students * (module.credits / lectureWeeks) * (module.nqfLevel - 5)
  );
};
let formalInstructionCourseworkMarkingHours = async activityId => {
  let activity = await formalInstructionActivity(activityId);
  let module = await ModuleMethods.module(
    activity.moduleId,
    activity.blockId,
    activity.offeringTypeId,
    activity.qualificationId
  );
  let students = await formalInstructionStudentsEnrolled(activityId);
  let lectureWeeks = await formalInstructionLectureWeeks(activityId);

  return Math.round(0.5 * students * (module.credits / lectureWeeks));
};
let formalInstructionFeedbackHours = async activityId => {
  let activity = await formalInstructionActivity(activityId);
  let module = await ModuleMethods.module(
    activity.moduleId,
    activity.blockId,
    activity.offeringTypeId,
    activity.qualificationId
  );
  let students = await formalInstructionStudentsEnrolled(activityId);
  let lectureWeeks = await formalInstructionLectureWeeks(activityId);

  return Math.round(1 * students * (module.credits / lectureWeeks));
};
let formalInstructionFormativeAssessmentHours = async activityId => {
  let activity = await formalInstructionActivity(activityId);
  let module = await ModuleMethods.module(
    activity.moduleId,
    activity.blockId,
    activity.offeringTypeId,
    activity.qualificationId
  );
  let students = await formalInstructionStudentsEnrolled(activityId);
  let lectureWeeks = await formalInstructionLectureWeeks(activityId);

  return Math.round(0.4 * students * (module.credits / lectureWeeks));
};
let formalInstructionModerationHours = async activityId => {
  let activity = await formalInstructionActivity(activityId);
  let module = await ModuleMethods.module(
    activity.moduleId,
    activity.blockId,
    activity.offeringTypeId,
    activity.qualificationId
  );
  let students = await formalInstructionStudentsEnrolled(activityId);
  let lectureWeeks = await formalInstructionLectureWeeks(activityId);

  let moderation = 0;
  if (activity.userId === module.moderatorId) {
    moderation = Math.round((0.1 * students * module.credits) / lectureWeeks);
  }
  return moderation;
};
let formalInstructionTotalHoursPerActivity = async activityId => {
  return Math.round(
    (await formalInstructionBaseContactHours(activityId)) +
      (await formalInstructionCoordinationHours(activityId)) +
      (await formalInstructionStudentSupportHours(activityId)) +
      (await formalInstructionPreparationTimeHours(activityId)) +
      (await formalInstructionAssessmentSettingHours(activityId)) +
      (await formalInstructionExamMarkingHours(activityId)) +
      (await formalInstructionCourseworkMarkingHours(activityId)) +
      (await formalInstructionFeedbackHours(activityId)) +
      (await formalInstructionFormativeAssessmentHours(activityId)) +
      (await formalInstructionModerationHours(activityId))
  );
};
let formalInstructionOtherHoursPerActivity = async activityId => {
  return Math.round(
    (await formalInstructionCoordinationHours(activityId)) +
      (await formalInstructionStudentSupportHours(activityId)) +
      (await formalInstructionPreparationTimeHours(activityId)) +
      (await formalInstructionAssessmentSettingHours(activityId)) +
      (await formalInstructionExamMarkingHours(activityId)) +
      (await formalInstructionCourseworkMarkingHours(activityId)) +
      (await formalInstructionFeedbackHours(activityId)) +
      (await formalInstructionFormativeAssessmentHours(activityId)) +
      (await formalInstructionModerationHours(activityId))
  );
};
let formalInstructionTotalHoursPerUser = async userId => {
  let activities = await formalInstructionActivitiesByUser(userId);
  let sum = 0;
  for (let activity of activities) {
    sum += await formalInstructionTotalHoursPerActivity(activity.activityId);
  }

  return Math.round(sum);
};
let formalInstructionPercentageOfWorkFocusPerActivity = async activityId => {
  let activity = await formalInstructionActivity(activityId);
  let activityHours = await formalInstructionTotalHoursPerActivity(activityId);
  let workFocusHours = await WorkFocusMethods.teachingHours(activity.userId);

  return Math.round((activityHours / workFocusHours) * 100);
};
let formalInstructionPercentageOfAnnualPerActivity = async activityId => {
  let activityHours = await formalInstructionTotalHoursPerActivity(activityId);
  let annualHours = await parameters.annual_total_hours;

  return Math.round((activityHours / annualHours) * 100);
};
let formalInstructionPercentageOfWorkFocusPerUser = async userId => {
  let activities = await formalInstructionActivitiesByUser(userId);
  let sum = 0;
  for (let activity of activities) {
    sum += await formalInstructionPercentageOfWorkFocusPerActivity(
      activity.activityId
    );
  }

  return Math.round(sum);
};
let formalInstructionPercentageOfAnnualPerUser = async userId => {
  let activities = await formalInstructionActivitiesByUser(userId);
  let sum = 0;
  for (let activity of activities) {
    sum += await formalInstructionPercentageOfAnnualPerActivity(
      activity.activityId
    );
  }

  return Math.round(sum);
};

export {
  formalInstructionActivity,
  formalInstructionActivities,
  formalInstructionActivitiesByUser,
  addFormalInstructionActivity,
  editFormalInstructionActivity,
  deleteFormalInstructionActivity,
  formalInstructionLectureWeeks,
  formalInstructionStudentsEnrolled,
  formalInstructionBaseContactHours,
  formalInstructionCoordinationHours,
  formalInstructionStudentSupportHours,
  formalInstructionPreparationTimeHours,
  formalInstructionAssessmentSettingHours,
  formalInstructionExamMarkingHours,
  formalInstructionCourseworkMarkingHours,
  formalInstructionFeedbackHours,
  formalInstructionFormativeAssessmentHours,
  formalInstructionModerationHours,
  formalInstructionOtherHoursPerActivity,
  formalInstructionTotalHoursPerActivity,
  formalInstructionTotalHoursPerUser,
  formalInstructionPercentageOfWorkFocusPerActivity,
  formalInstructionPercentageOfAnnualPerActivity,
  formalInstructionPercentageOfWorkFocusPerUser,
  formalInstructionPercentageOfAnnualPerUser
};
