import SupervisionActivity from './../../models/activity/supervision-activity';
import * as AAWorkloadMethods from './../workload/academic-administration';
import * as CIWorkloadMethods from '../../controllers/workload/community-instruction';
import * as EMWorkloadMethods from '../../controllers/workload/executive-management';
import * as FIWorkloadMethods from '../../controllers/workload/formal-instruction';
import * as PDWorkloadMethods from '../../controllers/workload/personnel-development';
import * as PSWorkloadMethods from '../../controllers/workload/public-service';
import * as RWorkloadMethods from '../../controllers/workload/research';
import * as SWorkloadMethods from '../../controllers/workload/supervision';
import * as WorkFocusMethods from './../work-focus';
import * as WorkloadMethods from './../workload';
import parameters from './../../config/parameters';

// PS METHODS
let supervisionActivity = async activityId => {
  return await SupervisionActivity.findOne({ activityId: activityId })
    .populate('user')
    .populate('duty')
    .populate('student');
};
let supervisionActivities = async () => {
  return await SupervisionActivity.find({})
    .populate('user')
    .populate('duty')
    .populate('student');
};
let supervisionActivitiesByUser = async userId => {
  return await SupervisionActivity.find({ userId: userId })
    .populate('user')
    .populate('duty')
    .populate('student');
};
let addSupervisionActivity = async activity => {
  const newSupervisionActivity = new SupervisionActivity(activity);

  await newSupervisionActivity.save();

  // Write workload data
  try {
    await AAWorkloadMethods.addAcademicAdministrationWorkload(
      newSupervisionActivity.userId
    );
    await CIWorkloadMethods.addCommunityInstructionWorkload(
      newSupervisionActivity.userId
    );
    await EMWorkloadMethods.addExecutiveManagementWorkload(
      newSupervisionActivity.userId
    );
    await FIWorkloadMethods.addFormalInstructionWorkload(
      newSupervisionActivity.userId
    );
    await PDWorkloadMethods.addPersonnelDevelopmentWorkload(
      newSupervisionActivity.userId
    );
    await PSWorkloadMethods.addPublicServiceWorkload(
      newSupervisionActivity.userId
    );
    await RWorkloadMethods.addResearchWorkload(newSupervisionActivity.userId);
    await SWorkloadMethods.addSupervisionWorkload(
      newSupervisionActivity.userId
    );
  } catch (error) {
    console.log(error);
  }

  // Return activity
  return await supervisionActivity(newSupervisionActivity.activityId);
};
let editSupervisionActivity = async activity => {
  return await SupervisionActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};
let deleteSupervisionActivity = async activity => {
  const deletedActivity = await SupervisionActivity.findOneAndRemove(activity);

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

// WORKLOAD METHODS
let supervisionGlobalTarrif = async () => {
  return 0;
};
let supervisionTotalHoursPerActivity = async activityId => {
  const activity = await supervisionActivity(activityId);

  let total = 40;
  if (activity.split !== 100) {
    total = 40 * (activity.split / 100);
  }
  return total;
};
let supervisionTotalHoursPerUser = async userId => {
  let globalTarrif = await supervisionGlobalTarrif();
  let activities = await supervisionActivitiesByUser(userId);
  let activityHours = 0;
  for (let activity of activities) {
    activityHours += await supervisionTotalHoursPerActivity(
      activity.activityId
    );
  }

  return activityHours + globalTarrif;
};
let supervisionPercentageOfWorkFocusPerActivity = async activityId => {
  let activity = await supervisionActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await supervisionTotalHoursPerActivity(activityId);

  return (activityHours / serviceHours) * 100;
};
let supervisionPercentageOfWorkFocusPerUser = async userId => {
  let teachingHours = await WorkFocusMethods.teachingHours(userId);
  let activityHours = await supervisionTotalHoursPerUser(userId);

  return (activityHours / teachingHours) * 100;
};
let supervisionPercentageOfAnnualHoursPerActivity = async activityId => {
  let activityHours = await supervisionTotalHoursPerActivity(activityId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let supervisionPercentageOfAnnualHoursPerUser = async userId => {
  let activityHours = await supervisionTotalHoursPerUser(userId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let supervisionPercentageOfTotalHoursPerActivity = async activityId => {
  let activity = await supervisionActivity(activityId);
  let activityHours = 0;
  activityHours = await supervisionTotalHoursPerActivity(activityId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(activity.userId);

  return (activityHours / totalHours) * 100;
};
let supervisionPercentageOfTotalHoursPerUser = async userId => {
  let activityHours = await supervisionTotalHoursPerUser(userId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(userId);

  return (activityHours / totalHours) * 100;
};

export {
  supervisionActivity,
  supervisionActivities,
  supervisionActivitiesByUser,
  addSupervisionActivity,
  editSupervisionActivity,
  deleteSupervisionActivity,
  supervisionGlobalTarrif,
  supervisionTotalHoursPerActivity,
  supervisionTotalHoursPerUser,
  supervisionPercentageOfWorkFocusPerActivity,
  supervisionPercentageOfWorkFocusPerUser,
  supervisionPercentageOfAnnualHoursPerActivity,
  supervisionPercentageOfTotalHoursPerActivity,
  supervisionPercentageOfAnnualHoursPerUser,
  supervisionPercentageOfTotalHoursPerUser
};
