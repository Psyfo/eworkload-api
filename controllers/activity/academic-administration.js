import AcademicAdministrationActivity from '../../models/activity/academic-administration-activity';
import * as WorkFocusMethods from './../work-focus';
import parameters from './../../config/parameters';

// AA METHODS
let academicAdministrationActivity = async activityId => {
  return await AcademicAdministrationActivity.findOne({
    activityId: activityId
  });
};
let academicAdministrationActivities = async () => {
  return await AcademicAdministrationActivity.find({});
};
let academicAdministrationActivitiesByUser = async userId => {
  return await AcademicAdministrationActivity.find({ userId: userId });
};
let addAcademicAdministrationActivity = async activity => {
  const newAcademicAdministrationActivity = await new AcademicAdministrationActivity(
    activity
  );

  return await newAcademicAdministrationActivity.save();
};
let editAcademicAdministrationActivity = async activity => {
  return await AcademicAdministrationActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { updert: true }
  );
};
let deleteAcademicAdministrationActivity = async activity => {
  return await AcademicAdministrationActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS
let academicAdministrationGlobalTarrif = async () => {
  return parameters.global_personnel_development_tarrif;
};
let academicAdministrationTotalHoursPerActivity = async activityId => {
  let activity = await academicAdministrationActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);

  return Math.round(serviceHours / 10);
};
let academicAdministrationTotalHoursPerUser = async userId => {
  let globalTarrif = await academicAdministrationGlobalTarrif();
  let activities = await academicAdministrationActivitiesByUser(userId);
  let count = activities.length;
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours = Math.round((count * serviceHours) / 10);

  return activityHours + globalTarrif;
};
let academicAdministrationPercentageOfWorkFocusPerActivity = async activityId => {
  let activity = await academicAdministrationActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await academicAdministrationTotalHoursPerActivity(
    activityId
  );

  return Math.round((activityHours / serviceHours) * 100);
};
let academicAdministrationPercentageOfWorkFocusPerUser = async userId => {
  let globalTarrif = await academicAdministrationGlobalTarrif();
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours =
    (await academicAdministrationTotalHoursPerUser(userId)) + globalTarrif;

  return Math.round((activityHours / serviceHours) * 100);
};
let academicAdministrationPercentageOfAnnualHoursPerActivity = async activityId => {
  let activityHours = await academicAdministrationTotalHoursPerActivity(
    activityId
  );
  let annualHours = parameters.annual_total_hours;

  return Math.round((activityHours / annualHours) * 100);
};
let academicAdministrationPercentageOfAnnualHoursPerUser = async userId => {
  let globalTarrif = await academicAdministrationGlobalTarrif();
  let activityHours =
    (await academicAdministrationTotalHoursPerUser(userId)) + globalTarrif;
  let annualHours = parameters.annual_total_hours;

  return Math.round((activityHours / annualHours) * 100);
};

export {
  academicAdministrationActivity,
  academicAdministrationActivities,
  academicAdministrationActivitiesByUser,
  addAcademicAdministrationActivity,
  editAcademicAdministrationActivity,
  deleteAcademicAdministrationActivity,
  academicAdministrationGlobalTarrif,
  academicAdministrationTotalHoursPerActivity,
  academicAdministrationTotalHoursPerUser,
  academicAdministrationPercentageOfWorkFocusPerActivity,
  academicAdministrationPercentageOfWorkFocusPerUser,
  academicAdministrationPercentageOfAnnualHoursPerActivity,
  academicAdministrationPercentageOfAnnualHoursPerUser
};
