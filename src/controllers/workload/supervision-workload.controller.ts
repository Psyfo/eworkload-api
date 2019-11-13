import SupervisionActivity from "../../models/activity/supervision-activity.model";
import SupervisionWorkload from "../../models/workload/supervision.model";
import * as SupervisionMethods from "../activity/supervision.controller";

let initializeSWorkload = async (userId: string) => {
  let sWorkload = new SupervisionWorkload({
    userId: userId
  });
  return await sWorkload.save();
};
let supervisionWorkload = async (userId: string) => {
  return await SupervisionWorkload.findOne({ userId: userId }).orFail();
};
let calculateSupervisionWorkload = async (userId: string) => {
  let supervisionWorkloads = [];
  let activities: any[] = await SupervisionActivity.find({
    userId: userId
  });

  for (let activity of activities) {
    let supervisionTotalHoursPerActivity = await SupervisionMethods.supervisionTotalHoursPerActivity(
      activity.activityId
    );
    let percentageOfWorkFocusPerActivity = await SupervisionMethods.supervisionPercentageOfWorkFocusPerActivity(
      activity.activityId
    );
    let percentageOfAnnualHoursPerActivity = await SupervisionMethods.supervisionPercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
    let percentageOfTotalHoursPerActivity = await SupervisionMethods.supervisionPercentageOfTotalHoursPerActivity(
      activity.activityId
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

  return await supervisionWorkload.save();
};
let deleteSupervisionWorkload = async (userId: string) => {
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
