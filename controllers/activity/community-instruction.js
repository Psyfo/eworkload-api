import CommunityInstructionActivity from '../../models/activity/community-instruction-activity';
import * as WorkFocusMethods from './../work-focus';
import parameters from './../../config/parameters';

// CI METHODS
let communityInstructionActivity = async activityId => {
  return await CommunityInstructionActivity.findOne({ activityId: activityId });
};
let communityInstructionActivities = async () => {
  return await CommunityInstructionActivity.find({});
};
let communityInstructionActivitiesByUser = async userId => {
  return await CommunityInstructionActivity.find({ userId: userId });
};
let addCommunityInstructionActivity = async activity => {
  const newCommunityInstructionActivity = await new CommunityInstructionActivity(
    activity
  );

  return await newCommunityInstructionActivity.save();
};
let editCommunityInstructionActivity = async activity => {
  return await CommunityInstructionActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { updert: true }
  );
};
let deleteCommunityInstructionActivity = async activity => {
  return await CommunityInstructionActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS
let communityInstructionGlobalTarrif = async () => {
  return parameters.global_personnel_development_tarrif;
};
let communityInstructionTotalHoursPerActivity = async activityId => {
  let activity = await communityInstructionActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);

  return Math.round(serviceHours / 10);
};
let communityInstructionTotalHoursPerUser = async userId => {
  let globalTarrif = await communityInstructionGlobalTarrif();
  let activities = await communityInstructionActivitiesByUser(userId);
  let count = activities.length;
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours = Math.round((count * serviceHours) / 10);

  return activityHours + globalTarrif;
};
let communityInstructionPercentageOfWorkFocusPerActivity = async activityId => {
  let activity = await communityInstructionActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await communityInstructionTotalHoursPerActivity(
    activityId
  );

  return Math.round((activityHours / serviceHours) * 100);
};
let communityInstructionPercentageOfWorkFocusPerUser = async userId => {
  let globalTarrif = await communityInstructionGlobalTarrif();
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours =
    (await communityInstructionTotalHoursPerUser(userId)) + globalTarrif;

  return Math.round((activityHours / serviceHours) * 100);
};
let communityInstructionPercentageOfAnnualHoursPerActivity = async activityId => {
  let activityHours = await communityInstructionTotalHoursPerActivity(
    activityId
  );
  let annualHours = parameters.annual_total_hours;

  return Math.round((activityHours / annualHours) * 100);
};
let communityInstructionPercentageOfAnnualHoursPerUser = async userId => {
  let globalTarrif = await communityInstructionGlobalTarrif();
  let activityHours =
    (await communityInstructionTotalHoursPerUser(userId)) + globalTarrif;
  let annualHours = parameters.annual_total_hours;

  return Math.round((activityHours / annualHours) * 100);
};

export {
  communityInstructionActivity,
  communityInstructionActivities,
  communityInstructionActivitiesByUser,
  addCommunityInstructionActivity,
  editCommunityInstructionActivity,
  deleteCommunityInstructionActivity,
  communityInstructionGlobalTarrif,
  communityInstructionTotalHoursPerActivity,
  communityInstructionTotalHoursPerUser,
  communityInstructionPercentageOfWorkFocusPerActivity,
  communityInstructionPercentageOfWorkFocusPerUser,
  communityInstructionPercentageOfAnnualHoursPerActivity,
  communityInstructionPercentageOfAnnualHoursPerUser
};
