import * as ExecutiveManagementMethods from './../activity/executive-management';

import ExecutiveManagementActivity from './../../models/activity/executive-management-activity';
import ExecutiveManagementWorkload from './../../models/workload/executive-management';

let initializeEMWorkload = async userId => {
  let emWorkload = new ExecutiveManagementWorkload({
    userId: userId
  });
  return await emWorkload.save();
};
let executiveManagementWorkload = async userId => {
  return await ExecutiveManagementWorkload.findOne({ userId: userId });
};
let addExecutiveManagementWorkload = async userId => {
  // Only one workload record so delete first if it exists
  try {
    await deleteExecutiveManagementWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }

  let executiveManagementWorkloads = [];
  let executiveManagementActivities = await ExecutiveManagementActivity.find({
    userId: userId
  });

  for (let executiveManagementActivity of executiveManagementActivities) {
    let activity = await ExecutiveManagementMethods.executiveManagementActivity(
      executiveManagementActivity.activityId
    );
    let executiveManagementTotalHoursPerActivity = await ExecutiveManagementMethods.executiveManagementTotalHoursPerActivity(
      executiveManagementActivity.activityId
    );
    let percentageOfWorkFocusPerActivity = await ExecutiveManagementMethods.executiveManagementPercentageOfWorkFocusPerActivity(
      executiveManagementActivity.activityId
    );
    let percentageOfAnnualHoursPerActivity = await ExecutiveManagementMethods.executiveManagementPercentageOfAnnualHoursPerActivity(
      executiveManagementActivity.activityId
    );
    let percentageOfTotalHoursPerActivity = await ExecutiveManagementMethods.executiveManagementPercentageOfTotalHoursPerActivity(
      executiveManagementActivity.activityId
    );
    executiveManagementWorkloads.push({
      activity: activity,
      totalHoursPerActivity: executiveManagementTotalHoursPerActivity,
      percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
      percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
      percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
    });
  }
  let globalTarrif = await ExecutiveManagementMethods.executiveManagementGlobalTarrif();
  let totalHoursPerUser = await ExecutiveManagementMethods.executiveManagementTotalHoursPerUser(
    userId
  );
  let percentageOfWorkFocusPerUser = await ExecutiveManagementMethods.executiveManagementPercentageOfWorkFocusPerUser(
    userId
  );
  let percentageOfAnnualHoursPerUser = await ExecutiveManagementMethods.executiveManagementPercentageOfAnnualHoursPerUser(
    userId
  );
  let percentageOfTotalHoursPerUser = await ExecutiveManagementMethods.executiveManagementPercentageOfTotalHoursPerUser(
    userId
  );

  let executiveManagementWorkload = new ExecutiveManagementWorkload();
  executiveManagementWorkload = new ExecutiveManagementWorkload({
    userId: userId,
    executiveManagementWorkloads: executiveManagementWorkloads,
    globalTarrif: globalTarrif,
    totalHoursPerUser: totalHoursPerUser,
    percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  });

  executiveManagementWorkload.save();

  console.log('Executive Management Workload saved');
};
let deleteExecutiveManagementWorkload = async userId => {
  return await ExecutiveManagementWorkload.findOneAndRemove({
    userId: userId
  });
};

export {
  initializeEMWorkload,
  executiveManagementWorkload,
  addExecutiveManagementWorkload,
  deleteExecutiveManagementWorkload
};
