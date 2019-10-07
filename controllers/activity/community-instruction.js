import CommunityInstructionActivity from '../../models/activity/community-instruction-activity';
import * as CIWorkloadMethods from '../../controllers/workload/community-instruction';
import * as WorkFocusMethods from './../work-focus';
import * as WorkloadMethods from './../workload';
import parameters from './../../config/parameters';

// CI METHODS
let communityInstructionActivity = async activityId => {
  return await CommunityInstructionActivity.findOne({ activityId: activityId })
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
let communityInstructionActivities = async () => {
  return await CommunityInstructionActivity.find({})
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
let communityInstructionActivitiesByUser = async userId => {
  return await CommunityInstructionActivity.find({ userId: userId })
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
let addCommunityInstructionActivity = async activity => {
  const newCommunityInstructionActivity = await new CommunityInstructionActivity(
    activity
  )
    .populate('user')
    .populate('duty');

  await newCommunityInstructionActivity.save();

  // Write workload data
  try {
    await CIWorkloadMethods.addCommunityInstructionWorkload(
      newCommunityInstructionActivity.userId
    );
  } catch (error) {
    console.log(error);
  }

  // Return activity
  return await communityInstructionActivity(
    newCommunityInstructionActivity.activityId
  );
};
let editCommunityInstructionActivity = async activity => {
  return await CommunityInstructionActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};
let deleteCommunityInstructionActivity = async activity => {
  const deletedActivity = await CommunityInstructionActivity.findOneAndRemove(
    activity
  );

  // Write workload data
  try {
    await CIWorkloadMethods.addCommunityInstructionWorkload(activity.userId);
  } catch (error) {
    console.log(error);
  }

  // Return activity
  return deletedActivity;
};

// WORKLOAD METHODS
let communityInstructionGlobalTarrif = async () => {
  return parameters.global_community_instruction_tarrif;
};
let communityInstructionTotalHoursPerActivity = async activityId => {
  let activity = await communityInstructionActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);

  return serviceHours / 10;
};
let communityInstructionTotalHoursPerUser = async userId => {
  let globalTarrif = await communityInstructionGlobalTarrif();
  let activities = await communityInstructionActivitiesByUser(userId);
  let activityHours = 0;
  for (let activity of activities) {
    activityHours += await communityInstructionTotalHoursPerActivity(
      activity.activityId
    );
  }

  return activityHours + globalTarrif;
};
let communityInstructionPercentageOfWorkFocusPerActivity = async activityId => {
  let activity = await communityInstructionActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await communityInstructionTotalHoursPerActivity(
    activityId
  );

  return (activityHours / serviceHours) * 100;
};
let communityInstructionPercentageOfWorkFocusPerUser = async userId => {
  let globalTarrif = await communityInstructionGlobalTarrif();
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours =
    (await communityInstructionTotalHoursPerUser(userId)) + globalTarrif;

  return (activityHours / serviceHours) * 100;
};
let communityInstructionPercentageOfAnnualHoursPerActivity = async activityId => {
  let activityHours = await communityInstructionTotalHoursPerActivity(
    activityId
  );
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let communityInstructionPercentageOfTotalHoursPerActivity = async activityId => {
  let activity = await communityInstructionActivity(activityId);
  let activityHours = await communityInstructionTotalHoursPerActivity(
    activityId
  );
  let totalHours = await WorkloadMethods.totalHoursPerUser(activity.userId);

  return (activityHours / totalHours) * 100;
};
let communityInstructionPercentageOfAnnualHoursPerUser = async userId => {
  let activityHours = await communityInstructionTotalHoursPerUser(userId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let communityInstructionPercentageOfTotalHoursPerUser = async userId => {
  let activityHours = await communityInstructionTotalHoursPerUser(userId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(userId);

  return (activityHours / totalHours) * 100;
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
  communityInstructionPercentageOfTotalHoursPerActivity,
  communityInstructionPercentageOfAnnualHoursPerUser,
  communityInstructionPercentageOfTotalHoursPerUser
};
