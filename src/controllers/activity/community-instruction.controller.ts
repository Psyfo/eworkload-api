import parameters from "../../config/parameters.config";
import CommunityInstructionActivity from "../../models/activity/community-instruction-activity.model";
import * as WorkFocusMethods from "../work-focus.controller";
import * as WorkloadMethods from "../workload.controller";

// CI METHODS
let communityInstructionActivity = async (activityId: string) => {
  return await CommunityInstructionActivity.findOne({ activityId: activityId })
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
let communityInstructionActivities = async () => {
  return await CommunityInstructionActivity.find({})
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
let communityInstructionActivitiesByUser = async (userId: string) => {
  return await CommunityInstructionActivity.find({ userId: userId })
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
let addCommunityInstructionActivity = async (activity: any) => {
  const newActivity = await new CommunityInstructionActivity(activity)
    .populate("user")
    .populate("duty");

  return await newActivity.save();
};
let editCommunityInstructionActivity = async (activity: any) => {
  return await CommunityInstructionActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};
let deleteCommunityInstructionActivity = async (activity: any) => {
  return await CommunityInstructionActivity.findOneAndRemove(activity);
};
// WORKLOAD METHODS
let communityInstructionGlobalTarrif = async () => {
  return parameters.global_community_instruction_tarrif;
};
let communityInstructionTotalHoursPerActivity = async (activityId: string) => {
  let activity: any = await communityInstructionActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);

  return serviceHours / 10;
};
let communityInstructionTotalHoursPerUser = async (userId: string) => {
  let globalTarrif = await communityInstructionGlobalTarrif();
  let activities: any[] = await communityInstructionActivitiesByUser(userId);
  let activityHours = 0;
  for (let activity of activities) {
    activityHours += await communityInstructionTotalHoursPerActivity(
      activity.activityId
    );
  }

  return activityHours + globalTarrif;
};
let communityInstructionPercentageOfWorkFocusPerActivity = async (
  activityId: string
) => {
  let activity: any = await communityInstructionActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await communityInstructionTotalHoursPerActivity(
    activityId
  );

  return (activityHours / serviceHours) * 100;
};
let communityInstructionPercentageOfWorkFocusPerUser = async (
  userId: string
) => {
  let globalTarrif = await communityInstructionGlobalTarrif();
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours =
    (await communityInstructionTotalHoursPerUser(userId)) + globalTarrif;

  return (activityHours / serviceHours) * 100;
};
let communityInstructionPercentageOfAnnualHoursPerActivity = async (
  activityId: string
) => {
  let activityHours = await communityInstructionTotalHoursPerActivity(
    activityId
  );
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let communityInstructionPercentageOfTotalHoursPerActivity = async (
  activityId: string
) => {
  let activity: any = await communityInstructionActivity(activityId);
  let activityHours = await communityInstructionTotalHoursPerActivity(
    activityId
  );
  let totalHours = await WorkloadMethods.totalHoursPerUser(activity.userId);
  if (totalHours === undefined) {
    throw new Error("Total hours did not come through");
  }
  return (activityHours / totalHours) * 100;
};
let communityInstructionPercentageOfAnnualHoursPerUser = async (
  userId: string
) => {
  let activityHours = await communityInstructionTotalHoursPerUser(userId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let communityInstructionPercentageOfTotalHoursPerUser = async (
  userId: string
) => {
  let activityHours = await communityInstructionTotalHoursPerUser(userId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(userId);
  if (totalHours === undefined) {
    throw new Error("Total hours did not come through");
  }
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
