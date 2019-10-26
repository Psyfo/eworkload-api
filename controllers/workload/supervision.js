import * as SupervisionMethods from './../activity/supervision';

import SupervisionActivity from './../../models/activity/supervision-activity';
import SupervisionWorkload from './../../models/workload/supervision';

let initializeSWorkload = async userId => {
  let sWorkload = new SupervisionWorkload({
    userId: userId
  });
  return await sWorkload.save();
};
let supervisionWorkload = async userId => {
  return await SupervisionWorkload.findOne({ userId: userId });
};
let calculateSupervisionWorkload = async userId => {
  // Only one workload record so delete first if it exists
  try {
    await deleteSupervisionWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }

  let supervisionWorkloads = [];
  let supervisionActivities = await SupervisionActivity.find({
    userId: userId
  });

  for (let supervisionActivity of supervisionActivities) {
    let activity = await SupervisionMethods.supervisionActivity(
      supervisionActivity.activityId
    );
    let supervisionTotalHoursPerActivity = await SupervisionMethods.supervisionTotalHoursPerActivity(
      supervisionActivity.activityId
    );
    let percentageOfWorkFocusPerActivity = await SupervisionMethods.supervisionPercentageOfWorkFocusPerActivity(
      supervisionActivity.activityId
    );
    let percentageOfAnnualHoursPerActivity = await SupervisionMethods.supervisionPercentageOfAnnualHoursPerActivity(
      supervisionActivity.activityId
    );
    let percentageOfTotalHoursPerActivity = await SupervisionMethods.supervisionPercentageOfTotalHoursPerActivity(
      supervisionActivity.activityId
    );
    supervisionWorkloads.push({
      activity: activity,
      totalHoursPerActivity: supervisionTotalHoursPerActivity,
      percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
      percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
      percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
    });
  }
  let totalHoursPerUser = await SupervisionMethods.supervisionTotalHoursPerUser(
    userId
  );
  let percentageOfWorkFocusPerUser = await SupervisionMethods.supervisionPercentageOfWorkFocusPerUser(
    userId
  );
  let percentageOfAnnualHoursPerUser = await SupervisionMethods.supervisionPercentageOfAnnualHoursPerUser(
    userId
  );
  let percentageOfTotalHoursPerUser = await SupervisionMethods.supervisionPercentageOfTotalHoursPerUser(
    userId
  );

  let supervisionWorkload = await new SupervisionWorkload();
  supervisionWorkload = await new SupervisionWorkload({
    userId: userId,
    supervisionWorkloads: supervisionWorkloads,
    totalHoursPerUser: totalHoursPerUser,
    percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  });

  // await supervisionWorkload.save();

  console.log('Supervision Workload created');
  return supervisionWorkload;
};
let deleteSupervisionWorkload = async userId => {
  return await SupervisionWorkload.findOneAndRemove({
    userId: userId
  });
};

export {
  initializeSWorkload,
  supervisionWorkload,
  calculateSupervisionWorkload,
  deleteSupervisionWorkload
};
