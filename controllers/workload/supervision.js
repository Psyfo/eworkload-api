import * as SupervisionMethods from './../activity/supervision';

import SupervisionActivity from './../../models/activity/supervision-activity';
import SupervisionWorkload from './../../models/workload/supervision';

let supervisionWorkload = async userId => {
  return await SupervisionWorkload.find({ userId: userId });
};
let addSupervisionWorkload = async userId => {
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

  let supervisionWorkload = new SupervisionWorkload({
    userId: userId,
    supervisionWorkloads: supervisionWorkloads,
    totalHoursPerUser: totalHoursPerUser,
    percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  });

  supervisionWorkload.save();
  console.log(supervisionWorkload);

  console.log('Academic Instruction Workload saved');
};
let deleteSupervisionWorkload = async userId => {
  return await SupervisionWorkload.findOneAndRemove({
    userId: userId
  });
};

export {
  supervisionWorkload,
  addSupervisionWorkload,
  deleteSupervisionWorkload
};
