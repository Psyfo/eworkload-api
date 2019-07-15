import PublicServiceActivity from '../../models/activity/public-service-activity';
import * as WorkFocusMethods from './../work-focus';
import parameters from './../../config/parameters';

// PS METHODS
let publicServiceActivity = async activityId => {
  return await PublicServiceActivity.findOne({ activityId: activityId });
};
let publicServiceActivities = async () => {
  return await PublicServiceActivity.find({});
};
let publicServiceActivitiesByUser = async userId => {
  return await PublicServiceActivity.find({ userId: userId });
};
let addPublicServiceActivity = async activity => {
  const newPublicServiceActivity = await new PublicServiceActivity(activity);

  return await newPublicServiceActivity.save();
};
let editPublicServiceActivity = async activity => {
  return await PublicServiceActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { updert: true }
  );
};
let deletePublicServiceActivity = async activity => {
  return await PublicServiceActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS
let publicServiceGlobalTarrif = async () => {
  return parameters.global_public_service_tarrif;
};
let publicServiceTotalHoursPerActivity = async activityId => {
  let activity = await publicServiceActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);

  return Math.round(serviceHours / 10);
};
let publicServicesTotalHoursPerUser = async userId => {
  let globalTarrif = await publicServiceGlobalTarrif();
  let activities = await publicServiceActivitiesByUser(userId);
  let count = activities.length;
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours = Math.round((count * serviceHours) / 10);

  return activityHours + globalTarrif;
};
let publicServicePercentageOfWorkFocusPerActivity = async activityId => {
  let activity = await publicServiceActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await publicServiceTotalHoursPerActivity(activityId);

  return Math.round((activityHours / serviceHours) * 100);
};
let publicServicePercentageOfWorkFocusPerUser = async userId => {
  let globalTarrif = await publicServiceGlobalTarrif();
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours =
    (await publicServicesTotalHoursPerUser(userId)) + globalTarrif;

  return Math.round((activityHours / serviceHours) * 100);
};
let publicServicePercentageOfAnnualHoursPerActivity = async activityId => {
  let activityHours = await publicServiceTotalHoursPerActivity(activityId);
  let annualHours = parameters.annual_total_hours;

  return Math.round((activityHours / annualHours) * 100);
};
let publicServicePercentageOfAnnualHoursPerUser = async userId => {
  let globalTarrif = await publicServiceGlobalTarrif();
  let activityHours =
    (await publicServicesTotalHoursPerUser(userId)) + globalTarrif;
  let annualHours = parameters.annual_total_hours;

  return Math.round((activityHours / annualHours) * 100);
};

export {
  publicServiceActivity,
  publicServiceActivities,
  publicServiceActivitiesByUser,
  addPublicServiceActivity,
  editPublicServiceActivity,
  deletePublicServiceActivity,
  publicServiceGlobalTarrif,
  publicServiceTotalHoursPerActivity,
  publicServicesTotalHoursPerUser,
  publicServicePercentageOfWorkFocusPerActivity,
  publicServicePercentageOfWorkFocusPerUser,
  publicServicePercentageOfAnnualHoursPerActivity,
  publicServicePercentageOfAnnualHoursPerUser
};
