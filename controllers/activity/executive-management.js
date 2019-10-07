import ExecutiveManagementActivity from '../../models/activity/executive-management-activity';
import * as EMWorkloadMethods from '../../controllers/workload/executive-management';
import * as WorkFocusMethods from './../work-focus';
import * as WorkloadMethods from './../workload';
import parameters from './../../config/parameters';

// EM METHODS
let executiveManagementActivity = async activityId => {
  return await ExecutiveManagementActivity.findOne({ activityId: activityId })
    .populate({
      path: 'user',
      model: 'User',
      populate: [
        { path: 'disciplines', model: 'Discipline' },
        { path: 'position', model: 'Position' },
        { path: 'workFocus', model: 'WorkFocus' }
      ]
    })
    .populate('duty');
};
let executiveManagementActivities = async () => {
  return await ExecutiveManagementActivity.find({})
    .populate({
      path: 'user',
      model: 'User',
      populate: [
        { path: 'disciplines', model: 'Discipline' },
        { path: 'position', model: 'Position' },
        { path: 'workFocus', model: 'WorkFocus' }
      ]
    })
    .populate('duty');
};
let executiveManagementActivitiesByUser = async userId => {
  return await ExecutiveManagementActivity.find({ userId: userId })
    .populate({
      path: 'user',
      model: 'User',
      populate: [
        { path: 'disciplines', model: 'Discipline' },
        { path: 'position', model: 'Position' },
        { path: 'workFocus', model: 'WorkFocus' }
      ]
    })
    .populate('duty');
};
let addExecutiveManagementActivity = async activity => {
  const newExecutiveManagementActivity = await new ExecutiveManagementActivity(
    activity
  );

  await newExecutiveManagementActivity.save();

  // Write workload data
  try {
    await EMWorkloadMethods.addExecutiveManagementWorkload(
      newExecutiveManagementActivity.userId
    );
  } catch (error) {
    console.log(error);
  }

  // Return activity
  return await executiveManagementActivity(
    newExecutiveManagementActivity.activityId
  );
};
let editExecutiveManagementActivity = async activity => {
  return await ExecutiveManagementActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};
let deleteExecutiveManagementActivity = async activity => {
  const deletedActivity = await ExecutiveManagementActivity.findOneAndRemove(
    activity
  );

  // Write workload data
  try {
    await EMWorkloadMethods.executiveManagementWorkload(activity.userId);
  } catch (error) {
    console.log(error);
  }

  // Return activity
  return deletedActivity;
};

// WORKLOAD METHODS
let executiveManagementGlobalTarrif = async () => {
  return parameters.global_executive_management_tarrif;
};
let executiveManagementTotalHoursPerActivity = async activityId => {
  let activity = await executiveManagementActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);

  return serviceHours / 10;
};
let executiveManagementTotalHoursPerUser = async userId => {
  let globalTarrif = await executiveManagementGlobalTarrif();
  let activities = await executiveManagementActivitiesByUser(userId);
  let activityHours = 0;
  for (let activity of activities) {
    activityHours += await executiveManagementTotalHoursPerActivity(
      activity.activityId
    );
  }

  return activityHours + globalTarrif;
};
let executiveManagementPercentageOfWorkFocusPerActivity = async activityId => {
  let activity = await executiveManagementActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await executiveManagementTotalHoursPerActivity(
    activityId
  );

  return (activityHours / serviceHours) * 100;
};
let executiveManagementPercentageOfWorkFocusPerUser = async userId => {
  let globalTarrif = await executiveManagementGlobalTarrif();
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours =
    (await executiveManagementTotalHoursPerUser(userId)) + globalTarrif;

  return (activityHours / serviceHours) * 100;
};
let executiveManagementPercentageOfAnnualHoursPerActivity = async activityId => {
  let activityHours = await executiveManagementTotalHoursPerActivity(
    activityId
  );
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let executiveManagementPercentageOfTotalHoursPerActivity = async activityId => {
  let activity = await executiveManagementActivity(activityId);
  let activityHours = await executiveManagementTotalHoursPerActivity(
    activityId
  );
  let totalHours = await WorkloadMethods.totalHoursPerUser(activity.userId);

  return (activityHours / totalHours) * 100;
};
let executiveManagementPercentageOfAnnualHoursPerUser = async userId => {
  let activityHours = await executiveManagementTotalHoursPerUser(userId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let executiveManagementPercentageOfTotalHoursPerUser = async userId => {
  let activityHours = await executiveManagementTotalHoursPerUser(userId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(userId);

  return (activityHours / totalHours) * 100;
};

export {
  executiveManagementActivity,
  executiveManagementActivities,
  executiveManagementActivitiesByUser,
  addExecutiveManagementActivity,
  editExecutiveManagementActivity,
  deleteExecutiveManagementActivity,
  executiveManagementGlobalTarrif,
  executiveManagementTotalHoursPerActivity,
  executiveManagementTotalHoursPerUser,
  executiveManagementPercentageOfWorkFocusPerActivity,
  executiveManagementPercentageOfWorkFocusPerUser,
  executiveManagementPercentageOfAnnualHoursPerActivity,
  executiveManagementPercentageOfTotalHoursPerActivity,
  executiveManagementPercentageOfAnnualHoursPerUser,
  executiveManagementPercentageOfTotalHoursPerUser
};
