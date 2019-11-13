import parameters from "../../config/parameters.config";
import SupervisionActivity from "../../models/activity/supervision-activity.model";
import * as WorkFocusMethods from "../work-focus.controller";
import * as WorkloadMethods from "../workload.controller";

// PS METHODS
let supervisionActivity = async (activityId: string) => {
  return await SupervisionActivity.findOne({ activityId: activityId })
    .populate("user")
    .populate("duty")
    .populate("student");
};
let supervisionActivities = async () => {
  return await SupervisionActivity.find({})
    .populate("user")
    .populate("duty")
    .populate("student");
};
let supervisionActivitiesByUser = async (userId: string) => {
  return await SupervisionActivity.find({ userId: userId })
    .populate("user")
    .populate("duty")
    .populate("student");
};
let addSupervisionActivity = async (activity: any) => {
  const newActivity = new SupervisionActivity(activity);

  return await newActivity.save();
};
let editSupervisionActivity = async (activity: any) => {
  return await SupervisionActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};
let deleteSupervisionActivity = async (activity: any) => {
  return await SupervisionActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS
let supervisionGlobalTarrif = async () => {
  return 0;
};
let supervisionTotalHoursPerActivity = async (activityId: string) => {
  const activity: any = await supervisionActivity(activityId);

  let total = 100;
  if (activity.split !== 100) {
    total *= activity.split / 100;
  }
  return total;
};
let supervisionTotalHoursPerUser = async (userId: string) => {
  let globalTarrif = await supervisionGlobalTarrif();
  let activities: any[] = await supervisionActivitiesByUser(userId);
  let activityHours = 0;
  for (let activity of activities) {
    activityHours += await supervisionTotalHoursPerActivity(
      activity.activityId
    );
  }
  return activityHours + globalTarrif;
};
let supervisionPercentageOfWorkFocusPerActivity = async (
  activityId: string
) => {
  let activity: any = await supervisionActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await supervisionTotalHoursPerActivity(activityId);
  return (activityHours / serviceHours) * 100;
};
let supervisionPercentageOfWorkFocusPerUser = async (userId: string) => {
  let teachingHours = await WorkFocusMethods.teachingHours(userId);
  let activityHours = await supervisionTotalHoursPerUser(userId);
  return (activityHours / teachingHours) * 100;
};
let supervisionPercentageOfAnnualHoursPerActivity = async (
  activityId: string
) => {
  let activityHours = await supervisionTotalHoursPerActivity(activityId);
  let annualHours = parameters.annual_total_hours;
  return (activityHours / annualHours) * 100;
};
let supervisionPercentageOfAnnualHoursPerUser = async (userId: string) => {
  let activityHours = await supervisionTotalHoursPerUser(userId);
  let annualHours = parameters.annual_total_hours;
  return (activityHours / annualHours) * 100;
};
let supervisionPercentageOfTotalHoursPerActivity = async (
  activityId: string
) => {
  let activity: any = await supervisionActivity(activityId);
  let activityHours = 0;
  activityHours = await supervisionTotalHoursPerActivity(activityId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(activity.userId);
  if (totalHours === undefined) {
    throw new Error("Total hours is undefined");
  }
  return (activityHours / totalHours) * 100;
};
let supervisionPercentageOfTotalHoursPerUser = async (userId: string) => {
  let activityHours = await supervisionTotalHoursPerUser(userId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(userId);
  if (totalHours === undefined) {
    throw new Error("Total hours is undefined");
  }
  return (activityHours / totalHours) * 100;
};

export {
  supervisionActivity,
  supervisionActivities,
  supervisionActivitiesByUser,
  addSupervisionActivity,
  editSupervisionActivity,
  deleteSupervisionActivity,
  supervisionGlobalTarrif,
  supervisionTotalHoursPerActivity,
  supervisionTotalHoursPerUser,
  supervisionPercentageOfWorkFocusPerActivity,
  supervisionPercentageOfWorkFocusPerUser,
  supervisionPercentageOfAnnualHoursPerActivity,
  supervisionPercentageOfTotalHoursPerActivity,
  supervisionPercentageOfAnnualHoursPerUser,
  supervisionPercentageOfTotalHoursPerUser
};
