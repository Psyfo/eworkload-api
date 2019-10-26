import PersonnelDevelopmentActivity from '../../models/activity/personnel-development-activity';
import * as WorkFocusMethods from './../work-focus';
import * as WorkloadMethods from './../workload';
import parameters from './../../config/parameters';

// PD METHODS
let personnelDevelopmentActivity = async activityId => {
  return await PersonnelDevelopmentActivity.findOne({ activityId: activityId })
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
let personnelDevelopmentActivities = async () => {
  return await PersonnelDevelopmentActivity.find({})
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
let personnelDevelopmentActivitiesByUser = async userId => {
  return await PersonnelDevelopmentActivity.find({ userId: userId })
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
let addPersonnelDevelopmentActivity = async activity => {
  const newActivity = await new PersonnelDevelopmentActivity(activity);

  return await newActivity.save();
};
let editPersonnelDevelopmentActivity = async activity => {
  return await PersonnelDevelopmentActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
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

  return serviceHours / 10;
};
let personnelDevelopmentTotalHoursPerUser = async userId => {
  let globalTarrif = await personnelDevelopmentGlobalTarrif();
  let activities = await personnelDevelopmentActivitiesByUser(userId);
  let activityHours = 0;
  for (let activity of activities) {
    activityHours += await personnelDevelopmentTotalHoursPerActivity(
      activity.activityId
    );
  }

  return activityHours + globalTarrif;
};
let personnelDevelopmentPercentageOfWorkFocusPerActivity = async activityId => {
  let activity = await personnelDevelopmentActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await personnelDevelopmentTotalHoursPerActivity(
    activityId
  );

  return (activityHours / serviceHours) * 100;
};
let personnelDevelopmentPercentageOfWorkFocusPerUser = async userId => {
  let globalTarrif = await personnelDevelopmentGlobalTarrif();
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours =
    (await personnelDevelopmentTotalHoursPerUser(userId)) + globalTarrif;

  return (activityHours / serviceHours) * 100;
};
let personnelDevelopmentPercentageOfAnnualHoursPerActivity = async activityId => {
  let activityHours = await personnelDevelopmentTotalHoursPerActivity(
    activityId
  );
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let personnelDevelopmentPercentageOfAnnualHoursPerUser = async userId => {
  let activityHours = await personnelDevelopmentTotalHoursPerUser(userId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let personnelDevelopmentPercentageOfTotalHoursPerActivity = async activityId => {
  let activity = await personnelDevelopmentActivity(activityId);
  let activityHours = await personnelDevelopmentTotalHoursPerActivity(
    activityId
  );
  let totalHours = await WorkloadMethods.totalHoursPerUser(activity.userId);

  return (activityHours / totalHours) * 100;
};
let personnelDevelopmentPercentageOfTotalHoursPerUser = async userId => {
  let activityHours = await personnelDevelopmentTotalHoursPerUser(userId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(userId);

  return (activityHours / totalHours) * 100;
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
  personnelDevelopmentPercentageOfAnnualHoursPerUser,
  personnelDevelopmentPercentageOfTotalHoursPerActivity,
  personnelDevelopmentPercentageOfTotalHoursPerUser
};
