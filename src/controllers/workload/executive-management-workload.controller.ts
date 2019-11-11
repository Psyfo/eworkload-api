import * as ExecutiveManagementMethods from '../activity/executive-management.controller';

import ExecutiveManagementActivity from '../../models/activity/executive-management-activity.model';
import ExecutiveManagementWorkload from '../../models/workload/executive-management.model';

let initializeEMWorkload = async (userId: string) => {
  // Only one workload record so delete first if it exists
  try {
    await deleteExecutiveManagementWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }
  let emWorkload = new ExecutiveManagementWorkload({
    userId: userId
  });
  return await emWorkload.save();
};
let executiveManagementWorkload = async (userId: string) => {
  return await ExecutiveManagementWorkload.findOne({ userId: userId });
};
let calculateExecutiveManagementWorkload = async (userId: string) => {
  // Only one workload record so delete first if it exists
  try {
    await deleteExecutiveManagementWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }

  let executiveManagementWorkloads = [];
  let executiveManagementActivities: any[] = await ExecutiveManagementActivity.find(
    {
      userId: userId
    }
  );

  for (let executiveManagementActivity of executiveManagementActivities) {
    let activity: any = await ExecutiveManagementMethods.executiveManagementActivity(
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

  let executiveManagementWorkload = await new ExecutiveManagementWorkload();
  executiveManagementWorkload = await new ExecutiveManagementWorkload({
    userId: userId,
    executiveManagementWorkloads: executiveManagementWorkloads,
    globalTarrif: globalTarrif,
    totalHoursPerUser: totalHoursPerUser,
    percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  });

  // await executiveManagementWorkload.save();

  console.log('Executive Management Workload created');
  return executiveManagementWorkload;
};
let deleteExecutiveManagementWorkload = async (userId: string) => {
  return await ExecutiveManagementWorkload.findOneAndRemove({
    userId: userId
  });
};

export {
  initializeEMWorkload,
  executiveManagementWorkload,
  calculateExecutiveManagementWorkload,
  deleteExecutiveManagementWorkload
};
