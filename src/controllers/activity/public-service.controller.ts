import PublicServiceActivity from "../../models/activity/public-service-activity.model";
import * as WorkFocusMethods from "../work-focus.controller";
import * as WorkloadMethods from "../workload.controller";
import parameters from "../../config/parameters.config";

// PS METHODS
let publicServiceActivity = async (activityId: string) => {
  return await PublicServiceActivity.findOne({ activityId: activityId })
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
let publicServiceActivities = async () => {
  return await PublicServiceActivity.find({})
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
let publicServiceActivitiesByUser = async (userId: string) => {
  return await PublicServiceActivity.find({ userId: userId })
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
let addPublicServiceActivity = async (activity: any) => {
  const newActivity = await new PublicServiceActivity(activity);

  return await newActivity.save();
};
let editPublicServiceActivity = async (activity: any) => {
  return await PublicServiceActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};
let deletePublicServiceActivity = async (activity: any) => {
  return await PublicServiceActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS
let publicServiceGlobalTarrif = async () => {
  return parameters.global_public_service_tarrif;
};
let publicServiceTotalHoursPerActivity = async (activityId: string) => {
  let activity: any = await publicServiceActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);

  return serviceHours / 10;
};
let publicServiceTotalHoursPerUser = async (userId: string) => {
  let globalTarrif = await publicServiceGlobalTarrif();
  let activities: any[] = await publicServiceActivitiesByUser(userId);
  let activityHours = 0;
  for (let activity of activities) {
    activityHours += await publicServiceTotalHoursPerActivity(
      activity.activityId
    );
  }

  return activityHours + globalTarrif;
};
let publicServicePercentageOfWorkFocusPerActivity = async (
  activityId: string
) => {
  let activity: any = await publicServiceActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await publicServiceTotalHoursPerActivity(activityId);

  return (activityHours / serviceHours) * 100;
};
let publicServicePercentageOfWorkFocusPerUser = async (userId: string) => {
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours = await publicServiceTotalHoursPerUser(userId);

  return (activityHours / serviceHours) * 100;
};
let publicServicePercentageOfAnnualHoursPerActivity = async (
  activityId: string
) => {
  let activityHours = await publicServiceTotalHoursPerActivity(activityId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let publicServicePercentageOfAnnualHoursPerUser = async (userId: string) => {
  let activityHours = await publicServiceTotalHoursPerUser(userId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let publicServicePercentageOfTotalHoursPerActivity = async (
  activityId: string
) => {
  let activity: any = await publicServiceActivity(activityId);
  let activityHours = await publicServiceTotalHoursPerActivity(activityId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(activity.userId);
  if (totalHours === undefined) {
    throw new Error("Total hours is undefined");
  }
  return (activityHours / totalHours) * 100;
};
let publicServicePercentageOfTotalHoursPerUser = async (userId: string) => {
  let activityHours = await publicServiceTotalHoursPerUser(userId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(userId);
  if (totalHours === undefined) {
    throw new Error("Total hours is undefined");
  }
  return (activityHours / totalHours) * 100;
};

export {
  publicServiceActivity,
  publicServiceActivities,
  publicServiceActivitiesByUser,
  addPublicServiceActivity,
  editPublicServiceActivity,
  deletePublicServiceActivity,
  publicServiceGlobalTarrif,
  publicServiceTotalHoursPerActivity,
  publicServiceTotalHoursPerUser,
  publicServicePercentageOfWorkFocusPerActivity,
  publicServicePercentageOfWorkFocusPerUser,
  publicServicePercentageOfAnnualHoursPerActivity,
  publicServicePercentageOfAnnualHoursPerUser,
  publicServicePercentageOfTotalHoursPerActivity,
  publicServicePercentageOfTotalHoursPerUser
};
