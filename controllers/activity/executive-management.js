import ExecutiveManagementActivity from '../../models/activity/executive-management-activity';
import * as WorkFocusMethods from './../work-focus';
import parameters from './../../config/parameters';

// EM METHODS
let executiveManagementActivity = async activityId => {
  return await ExecutiveManagementActivity.findOne({ activityId: activityId });
};
let executiveManagementActivities = async () => {
  return await ExecutiveManagementActivity.find({});
};
let executiveManagementActivitiesByUser = async userId => {
  return await ExecutiveManagementActivity.find({ userId: userId });
};
let addExecutiveManagementActivity = async activity => {
  const newExecutiveManagementActivity = await new ExecutiveManagementActivity(
    activity
  );

  return await newExecutiveManagementActivity.save();
};
let editExecutiveManagementActivity = async activity => {
  return await ExecutiveManagementActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { updert: true }
  );
};
let deleteExecutiveManagementActivity = async activity => {
  return await ExecutiveManagementActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS

let executiveManagementGlobalTarrif = async () => {
  return parameters.global_executive_management_tarrif;
};
let executiveManagementTotalHoursPerActivity = async activityId => {
  let activity = await executiveManagementActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);

  return Math.round(serviceHours / 10);
};
let executiveManagementTotalHoursPerUser = async userId => {
  let globalTarrif = await executiveManagementGlobalTarrif();
  let activities = await executiveManagementActivitiesByUser(userId);
  let count = activities.length;
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours = Math.round((count * serviceHours) / 10);

  return activityHours + globalTarrif;
};
let executiveManagementPercentageOfWorkFocusPerActivity = async activityId => {
  let activity = await executiveManagementActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await executiveManagementTotalHoursPerActivity(
    activityId
  );

  return Math.round((activityHours / serviceHours) * 100);
};
let executiveManagementPercentageOfWorkFocusPerUser = async userId => {
  let globalTarrif = await executiveManagementGlobalTarrif();
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours =
    (await executiveManagementTotalHoursPerUser(userId)) + globalTarrif;

  return Math.round((activityHours / serviceHours) * 100);
};
let executiveManagementPercentageOfAnnualHoursPerActivity = async activityId => {
  let activityHours = await executiveManagementTotalHoursPerActivity(
    activityId
  );
  let annualHours = parameters.annual_total_hours;

  return Math.round((activityHours / annualHours) * 100);
};
let executiveManagementPercentageOfAnnualHoursPerUser = async userId => {
  let globalTarrif = await executiveManagementGlobalTarrif();
  let activityHours =
    (await executiveManagementTotalHoursPerUser(userId)) + globalTarrif;
  let annualHours = parameters.annual_total_hours;

  return Math.round((activityHours / annualHours) * 100);
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
  executiveManagementPercentageOfAnnualHoursPerUser
};
