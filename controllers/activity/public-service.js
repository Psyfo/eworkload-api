import PublicServiceActivity from '../../models/activity/public-service-activity';
import * as PSWorkloadMethods from '../../controllers/workload/public-service';
import * as WorkFocusMethods from './../work-focus';
import * as WorkloadMethods from './../workload';
import parameters from './../../config/parameters';

// PS METHODS
let publicServiceActivity = async activityId => {
  return await PublicServiceActivity.findOne({ activityId: activityId })
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
let publicServiceActivities = async () => {
  return await PublicServiceActivity.find({})
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
let publicServiceActivitiesByUser = async userId => {
  return await PublicServiceActivity.find({ userId: userId })
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
let addPublicServiceActivity = async activity => {
  const newPublicServiceActivity = await new PublicServiceActivity(activity);

  await newPublicServiceActivity.save();

  // Write workload data
  try {
    await PSWorkloadMethods.addPublicServiceWorkload(
      newPublicServiceActivity.userId
    );
  } catch (error) {
    console.log(error);
  }

  // Return activity
  return await publicServiceActivity(newPublicServiceActivity.activityId);
};
let editPublicServiceActivity = async activity => {
  return await PublicServiceActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};
let deletePublicServiceActivity = async activity => {
  const deletedActivity = await PublicServiceActivity.findOneAndRemove(
    activity
  );

  // Write workload data
  try {
    await PSWorkloadMethods.addPublicServiceWorkload(activity.userId);
  } catch (error) {
    console.log(error);
  }

  // Return activity
  return deletedActivity;
};

// WORKLOAD METHODS
let publicServiceGlobalTarrif = async () => {
  return parameters.global_public_service_tarrif;
};
let publicServiceTotalHoursPerActivity = async activityId => {
  let activity = await publicServiceActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);

  return serviceHours / 10;
};
let publicServiceTotalHoursPerUser = async userId => {
  let globalTarrif = await publicServiceGlobalTarrif();
  let activities = await publicServiceActivitiesByUser(userId);
  let activityHours = 0;
  for (let activity of activities) {
    activityHours += await publicServiceTotalHoursPerActivity(
      activity.activityId
    );
  }

  return activityHours + globalTarrif;
};
let publicServicePercentageOfWorkFocusPerActivity = async activityId => {
  let activity = await publicServiceActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await publicServiceTotalHoursPerActivity(activityId);

  return (activityHours / serviceHours) * 100;
};
let publicServicePercentageOfWorkFocusPerUser = async userId => {
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours = await publicServiceTotalHoursPerUser(userId);

  return (activityHours / serviceHours) * 100;
};
let publicServicePercentageOfAnnualHoursPerActivity = async activityId => {
  let activityHours = await publicServiceTotalHoursPerActivity(activityId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let publicServicePercentageOfAnnualHoursPerUser = async userId => {
  let activityHours = await publicServiceTotalHoursPerUser(userId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let publicServicePercentageOfTotalHoursPerActivity = async activityId => {
  let activity = await publicServiceActivity(activityId);
  let activityHours = await publicServiceTotalHoursPerActivity(activityId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(activity.userId);

  return (activityHours / totalHours) * 100;
};
let publicServicePercentageOfTotalHoursPerUser = async userId => {
  let activityHours = await publicServiceTotalHoursPerUser(userId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(userId);

  return (activityHours / totalHours) * 100;
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
  publicServiceTotalHoursPerUser,
  publicServicePercentageOfWorkFocusPerActivity,
  publicServicePercentageOfWorkFocusPerUser,
  publicServicePercentageOfAnnualHoursPerActivity,
  publicServicePercentageOfAnnualHoursPerUser,
  publicServicePercentageOfTotalHoursPerActivity,
  publicServicePercentageOfTotalHoursPerUser
};
