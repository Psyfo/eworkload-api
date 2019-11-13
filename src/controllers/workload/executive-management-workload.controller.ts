import * as ExecutiveManagementMethods from "../activity/executive-management.controller";

import ExecutiveManagementActivity from "../../models/activity/executive-management-activity.model";
import ExecutiveManagementWorkload from "../../models/workload/executive-management.model";

let initializeEMWorkload = async (userId: string) => {
  let emWorkload = new ExecutiveManagementWorkload({
    userId: userId
  });
  return await emWorkload.save();
};
let executiveManagementWorkload = async (userId: string) => {
  return await ExecutiveManagementWorkload.findOne({ userId: userId }).orFail();
};
let calculateExecutiveManagementWorkload = async (userId: string) => {
  let executiveManagementWorkloads = [];
  let activities: any[] = await ExecutiveManagementActivity.find({
    userId: userId
  });

  for (let activity of activities) {
    let executiveManagementTotalHoursPerActivity = await ExecutiveManagementMethods.executiveManagementTotalHoursPerActivity(
      activity.activityId
    );
    let percentageOfWorkFocusPerActivity = await ExecutiveManagementMethods.executiveManagementPercentageOfWorkFocusPerActivity(
      activity.activityId
    );
    let percentageOfAnnualHoursPerActivity = await ExecutiveManagementMethods.executiveManagementPercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
    let percentageOfTotalHoursPerActivity = await ExecutiveManagementMethods.executiveManagementPercentageOfTotalHoursPerActivity(
      activity.activityId
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

  return await executiveManagementWorkload.save();
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
