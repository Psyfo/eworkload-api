import PersonnelDevelopmentActivity from '../../models/activity/personnel-development-activity';
import * as WorkFocusMethods from './../work-focus';
import parameters from './../../config/parameters';

// PD METHODS
let personnelDevelopmentActivity = async activityId => {
  return await PersonnelDevelopmentActivity.findOne({ activityId: activityId });
};
let personnelDevelopmentActivities = async () => {
  return await PersonnelDevelopmentActivity.find({});
};
let personnelDevelopmentActivitiesByUser = async userId => {
  return await PersonnelDevelopmentActivity.find({ userId: userId });
};
let addPersonnelDevelopmentActivity = async activity => {
  const newPersonnelDevelopmentActivity = await new PersonnelDevelopmentActivity(
    activity
  );

  return await newPersonnelDevelopmentActivity.save();
};
let editPersonnelDevelopmentActivity = async activity => {
  return await PersonnelDevelopmentActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { updert: true }
  );
};
let deletePersonnelDevelopmentActivity = async activity => {
  return await PersonnelDevelopmentActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS

let personnelDevelopmentGlobalTarrif = async () => {
  return parameters.global_personnel_development_tarrif;
};
let personnelDevelopmentTotalHoursPerActivity = async activityId => {
  let activity = await personnelDevelopmentActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);

  return Math.round(serviceHours / 10);
};
let personnelDevelopmentTotalHoursPerUser = async userId => {
  let globalTarrif = await personnelDevelopmentGlobalTarrif();
  let activities = await personnelDevelopmentActivitiesByUser(userId);
  let count = activities.length;
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours = Math.round((count * serviceHours) / 10);

  return activityHours + globalTarrif;
};
let personnelDevelopmentPercentageOfWorkFocusPerActivity = async activityId => {
  let activity = await personnelDevelopmentActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await personnelDevelopmentTotalHoursPerActivity(
    activityId
  );

  return Math.round((activityHours / serviceHours) * 100);
};
let personnelDevelopmentPercentageOfWorkFocusPerUser = async userId => {
  let globalTarrif = await personnelDevelopmentGlobalTarrif();
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours =
    (await personnelDevelopmentTotalHoursPerUser(userId)) + globalTarrif;

  return Math.round((activityHours / serviceHours) * 100);
};
let personnelDevelopmentPercentageOfAnnualHoursPerActivity = async activityId => {
  let activityHours = await personnelDevelopmentTotalHoursPerActivity(
    activityId
  );
  let annualHours = parameters.annual_total_hours;

  return Math.round((activityHours / annualHours) * 100);
};
let personnelDevelopmentPercentageOfAnnualHoursPerUser = async userId => {
  let globalTarrif = await personnelDevelopmentGlobalTarrif();
  let activityHours =
    (await personnelDevelopmentTotalHoursPerUser(userId)) + globalTarrif;
  let annualHours = parameters.annual_total_hours;

  return Math.round((activityHours / annualHours) * 100);
};

export {
  personnelDevelopmentActivity,
  personnelDevelopmentActivities,
  personnelDevelopmentActivitiesByUser,
  addPersonnelDevelopmentActivity,
  editPersonnelDevelopmentActivity,
  deletePersonnelDevelopmentActivity,
  personnelDevelopmentGlobalTarrif,
  personnelDevelopmentTotalHoursPerActivity,
  personnelDevelopmentTotalHoursPerUser,
  personnelDevelopmentPercentageOfWorkFocusPerActivity,
  personnelDevelopmentPercentageOfWorkFocusPerUser,
  personnelDevelopmentPercentageOfAnnualHoursPerActivity,
  personnelDevelopmentPercentageOfAnnualHoursPerUser
};
