import ExecutiveManagementActivity from "../../models/activity/executive-management-activity.model";
import * as WorkFocusMethods from "../work-focus.controller";
import * as WorkloadMethods from "../workload.controller";
import parameters from "../../config/parameters.config";

// EM METHODS
let executiveManagementActivity = async (activityId: string) => {
  return await ExecutiveManagementActivity.findOne({ activityId: activityId })
    .populate({
      path: "user",
      model: "User",
      populate: [
        { path: "disciplines", model: "Discipline" },
        { path: "position", model: "Position" },
        { path: "workFocus", model: "WorkFocus" }
      ]
    })
    .populate("duty");
};
let executiveManagementActivities = async () => {
  return await ExecutiveManagementActivity.find({})
    .populate({
      path: "user",
      model: "User",
      populate: [
        { path: "disciplines", model: "Discipline" },
        { path: "position", model: "Position" },
        { path: "workFocus", model: "WorkFocus" }
      ]
    })
    .populate("duty");
};
let executiveManagementActivitiesByUser = async (userId: string) => {
  return await ExecutiveManagementActivity.find({ userId: userId })
    .populate({
      path: "user",
      model: "User",
      populate: [
        { path: "disciplines", model: "Discipline" },
        { path: "position", model: "Position" },
        { path: "workFocus", model: "WorkFocus" }
      ]
    })
    .populate("duty");
};
let addExecutiveManagementActivity = async (activity: any) => {
  const newActivity = await new ExecutiveManagementActivity(activity);

  return await newActivity.save();
};
let editExecutiveManagementActivity = async (activity: any) => {
  return await ExecutiveManagementActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};
let deleteExecutiveManagementActivity = async (activity: any) => {
  return await ExecutiveManagementActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS
let executiveManagementGlobalTarrif = async () => {
  return parameters.global_executive_management_tarrif;
};
let executiveManagementTotalHoursPerActivity = async (activityId: string) => {
  let activity: any = await executiveManagementActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);

  return serviceHours / 10;
};
let executiveManagementTotalHoursPerUser = async (userId: string) => {
  let globalTarrif = await executiveManagementGlobalTarrif();
  let activities: any[] = await executiveManagementActivitiesByUser(userId);
  let activityHours = 0;
  for (let activity of activities) {
    activityHours += await executiveManagementTotalHoursPerActivity(
      activity.activityId
    );
  }

  return activityHours + globalTarrif;
};
let executiveManagementPercentageOfWorkFocusPerActivity = async (
  activityId: string
) => {
  let activity: any = await executiveManagementActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await executiveManagementTotalHoursPerActivity(
    activityId
  );

  return (activityHours / serviceHours) * 100;
};
let executiveManagementPercentageOfWorkFocusPerUser = async (
  userId: string
) => {
  let globalTarrif = await executiveManagementGlobalTarrif();
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours =
    (await executiveManagementTotalHoursPerUser(userId)) + globalTarrif;

  return (activityHours / serviceHours) * 100;
};
let executiveManagementPercentageOfAnnualHoursPerActivity = async (
  activityId: string
) => {
  let activityHours = await executiveManagementTotalHoursPerActivity(
    activityId
  );
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let executiveManagementPercentageOfTotalHoursPerActivity = async (
  activityId: string
) => {
  let activity: any = await executiveManagementActivity(activityId);
  let activityHours = await executiveManagementTotalHoursPerActivity(
    activityId
  );
  let totalHours = await WorkloadMethods.totalHoursPerUser(activity.userId);
  if (totalHours === undefined) {
    throw new Error("Total hours did not come through");
  }
  return (activityHours / totalHours) * 100;
};
let executiveManagementPercentageOfAnnualHoursPerUser = async (
  userId: string
) => {
  let activityHours = await executiveManagementTotalHoursPerUser(userId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let executiveManagementPercentageOfTotalHoursPerUser = async (
  userId: string
) => {
  let activityHours = await executiveManagementTotalHoursPerUser(userId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(userId);
  if (totalHours === undefined) {
    throw new Error("Total hours did not come through");
  }
  return (activityHours / totalHours) * 100;
};

export {
  executiveManagementActivity,
  executiveManagementActivities,
  executiveManagementActivitiesByUser,
  addExecutiveManagementActivity,
  editExecutiveManagementActivity,
  deleteExecutiveManagementActivity,
  executiveManagementGlobalTarrif,
  executiveManagementTotalHoursPerActivity,
  executiveManagementTotalHoursPerUser,
  executiveManagementPercentageOfWorkFocusPerActivity,
  executiveManagementPercentageOfWorkFocusPerUser,
  executiveManagementPercentageOfAnnualHoursPerActivity,
  executiveManagementPercentageOfTotalHoursPerActivity,
  executiveManagementPercentageOfAnnualHoursPerUser,
  executiveManagementPercentageOfTotalHoursPerUser
};
