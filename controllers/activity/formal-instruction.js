import FormalInstructionActivity from '../../models/activity/formal-instruction-activity';
import * as AAWorkloadMethods from './../workload/academic-administration';
import * as CIWorkloadMethods from '../../controllers/workload/community-instruction';
import * as EMWorkloadMethods from '../../controllers/workload/executive-management';
import * as FIWorkloadMethods from '../../controllers/workload/formal-instruction';
import * as PDWorkloadMethods from '../../controllers/workload/personnel-development';
import * as PSWorkloadMethods from '../../controllers/workload/public-service';
import * as RWorkloadMethods from '../../controllers/workload/research';
import * as SWorkloadMethods from '../../controllers/workload/supervision';
import * as EnrollmentMethods from '../enrollment';
import * as ModuleMethods from '../module';
import * as WorkFocusMethods from './../work-focus';
import * as WorkloadMethods from './../workload';
import parameters from './../../config/parameters';

let year = new Date().getFullYear().toString();

// FI METHODS
let formalInstructionActivity = async activityId => {
  return await FormalInstructionActivity.findOne({ activityId: activityId })
    .populate({
      path: 'user',
      model: 'User',
      populate: [
        { path: 'disciplines', model: 'Discipline' },
        { path: 'position', model: 'Position' },
        { path: 'workFocus', model: 'WorkFocus' }
      ]
    })
    .populate('duty')
    .populate({
      path: 'module',
      model: 'Module',
      populate: [
        { path: 'block', model: 'Block' },
        { path: 'offeringType', model: 'OfferingType' },
        { path: 'qualification', model: 'Qualification' },
        { path: 'disciplines', model: 'Discipline' },
        { path: 'venue', model: 'Venue' },
        { path: 'user', model: 'User' },
        { path: 'coordinator', model: 'User' },
        { path: 'moderator', model: 'User' }
      ]
    })
    .populate({ path: 'block', model: 'Block' })
    .populate({ path: 'offeringType', model: 'OfferingType' })
    .populate({ path: 'qualification', model: 'Qualification' });
};
let formalInstructionActivities = async () => {
  return await FormalInstructionActivity.find({})
    .populate({
      path: 'user',
      model: 'User',
      populate: [
        { path: 'disciplines', model: 'Discipline' },
        { path: 'position', model: 'Position' },
        { path: 'workFocus', model: 'WorkFocus' }
      ]
    })
    .populate('duty')
    .populate({
      path: 'module',
      model: 'Module',
      populate: [
        { path: 'block', model: 'Block' },
        { path: 'offeringType', model: 'OfferingType' },
        { path: 'qualification', model: 'Qualification' },
        { path: 'disciplines', model: 'Discipline' },
        { path: 'venue', model: 'Venue' },
        { path: 'user', model: 'User' },
        { path: 'coordinator', model: 'User' },
        { path: 'moderator', model: 'User' }
      ]
    })
    .populate({ path: 'block', model: 'Block' })
    .populate({ path: 'offeringType', model: 'OfferingType' })
    .populate({ path: 'qualification', model: 'Qualification' });
};
let formalInstructionActivitiesByUser = async userId => {
  return await FormalInstructionActivity.find({ userId: userId })
    .populate({
      path: 'user',
      model: 'User',
      populate: [
        { path: 'disciplines', model: 'Discipline' },
        { path: 'position', model: 'Position' },
        { path: 'workFocus', model: 'WorkFocus' }
      ]
    })
    .populate('duty')
    .populate({
      path: 'module',
      model: 'Module',
      populate: [
        { path: 'block', model: 'Block' },
        { path: 'offeringType', model: 'OfferingType' },
        { path: 'qualification', model: 'Qualification' },
        { path: 'disciplines', model: 'Discipline' },
        { path: 'venue', model: 'Venue' },
        { path: 'user', model: 'User' },
        { path: 'coordinator', model: 'User' },
        { path: 'moderator', model: 'User' }
      ]
    })
    .populate({ path: 'block', model: 'Block' })
    .populate({ path: 'offeringType', model: 'OfferingType' })
    .populate({ path: 'qualification', model: 'Qualification' });
};
let addFormalInstructionActivity = async activity => {
  // Create new activity
  const newFormalInstructionActivity = await new FormalInstructionActivity(
    activity
  );

  // Assign module
  await ModuleMethods.assignUserToModule(
    activity.moduleId,
    activity.blockId,
    activity.offeringTypeId,
    activity.qualificationId,
    activity.userId
  );

  await newFormalInstructionActivity.save();

  // Write workload data
  try {
    await AAWorkloadMethods.addAcademicAdministrationWorkload(
      newFormalInstructionActivity.userId
    );
    await CIWorkloadMethods.addCommunityInstructionWorkload(
      newFormalInstructionActivity.userId
    );
    await EMWorkloadMethods.addExecutiveManagementWorkload(
      newFormalInstructionActivity.userId
    );
    await FIWorkloadMethods.addFormalInstructionWorkload(
      newFormalInstructionActivity.userId
    );
    await PDWorkloadMethods.addPersonnelDevelopmentWorkload(
      newFormalInstructionActivity.userId
    );
    await PSWorkloadMethods.addPublicServiceWorkload(
      newFormalInstructionActivity.userId
    );
    await RWorkloadMethods.addResearchWorkload(
      newFormalInstructionActivity.userId
    );
    await SWorkloadMethods.addSupervisionWorkload(
      newFormalInstructionActivity.userId
    );
  } catch (error) {
    console.log(error);
  }

  // Return activity
  return await formalInstructionActivity(formalInstructionActivity.activityId);
};
let editFormalInstructionActivity = async activity => {
  // Assign module
  await ModuleMethods.assignUserToModule(
    activity.moduleId,
    activity.blockId,
    activity.offeringTypeId,
    activity.qualificationId,
    activity.userId
  );

  // Write workload data
  try {
    await AAWorkloadMethods.addAcademicAdministrationWorkload(activity.userId);
    await CIWorkloadMethods.addCommunityInstructionWorkload(activity.userId);
    await EMWorkloadMethods.addExecutiveManagementWorkload(activity.userId);
    await FIWorkloadMethods.addFormalInstructionWorkload(activity.userId);
    await PDWorkloadMethods.addPersonnelDevelopmentWorkload(activity.userId);
    await PSWorkloadMethods.addPublicServiceWorkload(activity.userId);
    await RWorkloadMethods.addResearchWorkload(activity.userId);
    await SWorkloadMethods.addSupervisionWorkload(activity.userId);
  } catch (error) {
    console.log(error);
  }

  let previousActivity = await formalInstructionActivity(activity.activityId);
  await ModuleMethods.unassignUserFromModule(
    previousActivity.moduleId,
    previousActivity.blockId,
    previousActivity.offeringTypeId,
    previousActivity.qualificationId,
    previousActivity.userId
  );

  // Edit Activity
  return await FormalInstructionActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};
let deleteFormalInstructionActivity = async activity => {
  await ModuleMethods.unassignUserFromModule(
    activity.moduleId,
    activity.blockId,
    activity.offeringTypeId,
    activity.qualificationId
  );
  const deletedActivity = await FormalInstructionActivity.findOneAndRemove(
    activity
  );
  console.log('Deleted activity:', deletedActivity);

  // Write workload data
  try {
    await AAWorkloadMethods.addAcademicAdministrationWorkload(
      deletedActivity.userId
    );
    await CIWorkloadMethods.addCommunityInstructionWorkload(
      deletedActivity.userId
    );
    await EMWorkloadMethods.addExecutiveManagementWorkload(
      deletedActivity.userId
    );
    await FIWorkloadMethods.addFormalInstructionWorkload(
      deletedActivity.userId
    );
    await PDWorkloadMethods.addPersonnelDevelopmentWorkload(
      deletedActivity.userId
    );
    await PSWorkloadMethods.addPublicServiceWorkload(deletedActivity.userId);
    await RWorkloadMethods.addResearchWorkload(deletedActivity.userId);
    await SWorkloadMethods.addSupervisionWorkload(deletedActivity.userId);
  } catch (error) {
    console.log(error);
  }

  // Return activity
  return deletedActivity;
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
  let module = activity.module;
  let enrollment = await EnrollmentMethods.enrollment(
    year,
    activity.qualificationId
  );

  let students = 0;
  if (module.studyPeriod === '1') {
    students = enrollment.firstYearEstimated;
  } else {
    students = enrollment.secondYearEstimated + enrollment.thirdYearEstimated;
  }
  return students;
};

// WORKLOAD METHODS
let formalInstructionBaseContactHours = async activityId => {
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  }).populate({ path: 'module', model: 'Module' });

  let module = activity.module;
  let students = await formalInstructionStudentsEnrolled(activityId);
  let lectureWeeks = await formalInstructionLectureWeeks(activityId);

  let repeats = Math.round(students / parameters.max_venue_size);

  return ((module.credits / 4) * lectureWeeks * repeats) / module.groupSize;
};
let formalInstructionCoordinationHours = async activityId => {
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  }).populate({ path: 'module', model: 'Module' });
  let module = activity.module;
  let students = await formalInstructionStudentsEnrolled(activityId);

  let coordination = 0;
  if (activity.userId === module.coordinatorId) {
    coordination = ((students - 100) / 40) * (module.credits / 10);
  }

  return coordination;
};
let formalInstructionStudentSupportHours = async activityId => {
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  }).populate({ path: 'module', model: 'Module' });
  let module = activity.module;
  let students = await formalInstructionStudentsEnrolled(activityId);
  let lectureWeeks = await formalInstructionLectureWeeks(activityId);

  return (0.1 * students * module.credits) / lectureWeeks;
};
let formalInstructionPreparationTimeHours = async activityId => {
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  }).populate({ path: 'module', model: 'Module' });
  let module = activity.module;
  let students = await formalInstructionStudentsEnrolled(activityId);
  let repeats = Math.round(students / parameters.max_venue_size);
  let baseContactHours = await formalInstructionBaseContactHours(activityId);
  return (baseContactHours / repeats) * (parseInt(module.nqfLevel) - 3);
};
let formalInstructionAssessmentSettingHours = async activityId => {
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  }).populate({ path: 'module', model: 'Module' });
  let module = activity.module;
  let lectureWeeks = await formalInstructionLectureWeeks(activityId);

  return (
    ((10 * module.credits) / lectureWeeks) * (parseInt(module.nqfLevel) - 3)
  );
};
let formalInstructionExamMarkingHours = async activityId => {
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  }).populate({ path: 'module', model: 'Module' });
  let module = activity.module;
  let students = await formalInstructionStudentsEnrolled(activityId);
  let lectureWeeks = await formalInstructionLectureWeeks(activityId);

  // let repeats = Math.round(students / parameters.max_venue_size);
  return (
    0.25 * students * (module.credits / lectureWeeks) * (module.nqfLevel - 5)
  );
};
let formalInstructionCourseworkMarkingHours = async activityId => {
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  }).populate({ path: 'module', model: 'Module' });
  let module = activity.module;
  let students = await formalInstructionStudentsEnrolled(activityId);
  let lectureWeeks = await formalInstructionLectureWeeks(activityId);

  return 0.5 * students * (module.credits / lectureWeeks);
};
let formalInstructionFeedbackHours = async activityId => {
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  }).populate({ path: 'module', model: 'Module' });
  let module = activity.module;
  let students = await formalInstructionStudentsEnrolled(activityId);
  let lectureWeeks = await formalInstructionLectureWeeks(activityId);

  return 1 * students * (module.credits / lectureWeeks);
};
let formalInstructionFormativeAssessmentHours = async activityId => {
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  }).populate({ path: 'module', model: 'Module' });
  let module = activity.module;
  let students = await formalInstructionStudentsEnrolled(activityId);
  let lectureWeeks = await formalInstructionLectureWeeks(activityId);

  return 0.4 * students * (module.credits / lectureWeeks);
};
let formalInstructionModerationHours = async activityId => {
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  }).populate({ path: 'module', model: 'Module' });
  let module = activity.module;
  let students = await formalInstructionStudentsEnrolled(activityId);
  let lectureWeeks = await formalInstructionLectureWeeks(activityId);

  let moderation = 0;
  if (activity.userId === module.moderatorId) {
    moderation = Math.round((0.1 * students * module.credits) / lectureWeeks);
  }
  return moderation;
};
let formalInstructionTotalHoursPerActivity = async activityId => {
  return (
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
  return (
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
  let activities = await FormalInstructionActivity.find({ userId: userId });

  let sum = 0;
  for (let activity of activities) {
    const activityHours = await formalInstructionTotalHoursPerActivity(
      activity.activityId
    );
    sum += activityHours;
  }

  return sum;
};
let formalInstructionPercentageOfWorkFocusPerActivity = async activityId => {
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  });
  let activityHours = await formalInstructionTotalHoursPerActivity(activityId);
  let workFocusHours = await WorkFocusMethods.teachingHours(activity.userId);

  return (activityHours / workFocusHours) * 100;
};
let formalInstructionPercentageOfAnnualHoursPerActivity = async activityId => {
  let activityHours = await formalInstructionTotalHoursPerActivity(activityId);
  let annualHours = await parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let formalInstructionPercentageOfTotalHoursPerActivity = async activityId => {
  let activity = await FormalInstructionActivity.findOne({
    activityId: activityId
  });
  let activityHours = await formalInstructionTotalHoursPerActivity(activityId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(activity.userId);

  return (activityHours / totalHours) * 100;
};
let formalInstructionPercentageOfWorkFocusPerUser = async userId => {
  let activities = await formalInstructionActivitiesByUser(userId);
  let sum = 0;
  for (let activity of activities) {
    sum += await formalInstructionPercentageOfWorkFocusPerActivity(
      activity.activityId
    );
  }

  return sum;
};
let formalInstructionPercentageOfAnnualHoursPerUser = async userId => {
  let activities = await formalInstructionActivitiesByUser(userId);
  let sum = 0;
  for (let activity of activities) {
    sum += await formalInstructionPercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
  }

  return sum;
};
let formalInstructionPercentageOfTotalHoursPerUser = async userId => {
  let activityHours = await formalInstructionTotalHoursPerUser(userId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(userId);

  return (activityHours / totalHours) * 100;
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
  formalInstructionPercentageOfAnnualHoursPerActivity,
  formalInstructionPercentageOfTotalHoursPerActivity,
  formalInstructionPercentageOfWorkFocusPerUser,
  formalInstructionPercentageOfAnnualHoursPerUser,
  formalInstructionPercentageOfTotalHoursPerUser
};
