import SupervisionActivity from './../../models/activity/supervision-activity';
import * as WorkFocusMethods from './../work-focus';
import parameters from './../../config/parameters';

// PS METHODS
let supervisionActivity = async activityId => {
  return await SupervisionActivity.findOne({ activityId: activityId });
};
let supervisionActivities = async () => {
  return await SupervisionActivity.find({});
};
let supervisionActivitiesByUser = async userId => {
  return await SupervisionActivity.find({ userId: userId });
};
let addSupervisionActivity = async activity => {
  const newSupervisionActivity = await new SupervisionActivity(activity);

  return await newSupervisionActivity.save();
};
let editSupervisionActivity = async activity => {
  return await SupervisionActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { updert: true }
  );
};
let deleteSupervisionActivity = async activity => {
  return await SupervisionActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS
let supervisionGlobalTarrif = async () => {
  return parameters.global_public_service_tarrif;
};
let supervisionTotalHoursPerActivity = async activityId => {
  let activity = await supervisionActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);

  return Math.round(serviceHours / 10);
};
let supervisionTotalHoursPerUser = async userId => {
  let globalTarrif = await supervisionGlobalTarrif();
  let activities = await supervisionActivitiesByUser(userId);
  let count = activities.length;
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours = Math.round((count * serviceHours) / 10);

  return activityHours + globalTarrif;
};
let supervisionPercentageOfWorkFocusPerActivity = async activityId => {
  let activity = await supervisionActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await supervisionTotalHoursPerActivity(activityId);

  return Math.round((activityHours / serviceHours) * 100);
};
let supervisionPercentageOfWorkFocusPerUser = async userId => {
  let globalTarrif = await supervisionGlobalTarrif();
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours =
    (await supervisionTotalHoursPerUser(userId)) + globalTarrif;

  return Math.round((activityHours / serviceHours) * 100);
};
let supervisionPercentageOfAnnualHoursPerActivity = async activityId => {
  let activityHours = await supervisionTotalHoursPerActivity(activityId);
  let annualHours = parameters.annual_total_hours;

  return Math.round((activityHours / annualHours) * 100);
};
let supervisionPercentageOfAnnualHoursPerUser = async userId => {
  let globalTarrif = await supervisionGlobalTarrif();
  let activityHours =
    (await supervisionTotalHoursPerUser(userId)) + globalTarrif;
  let annualHours = parameters.annual_total_hours;

  return Math.round((activityHours / annualHours) * 100);
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
  supervisionPercentageOfAnnualHoursPerUser
};
