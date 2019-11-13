import parameters from "../../config/parameters.config";
import AcademicAdministrationActivity from "../../models/activity/academic-administration-activity.model";
import * as WorkFocusMethods from "../work-focus.controller";
import * as WorkloadMethods from "../workload.controller";
import IAcademicAdministrationActivity from "interfaces/activity/academic-administration-activity.interface";
import { activity } from "./activity.controller";

// AA METHODS
let academicAdministrationActivity = async (activityId: string) => {
  return await AcademicAdministrationActivity.findOne({
    activityId: activityId
  })
    .populate({
      path: "user",
      model: "User",
      populate: [
        { path: "disciplines", model: "Discipline" },
        { path: "position", model: "Position" },
        { path: "workFocus", model: "WorkFocus" }
      ]
    })
    .populate("duty")
    .populate("qualification")
    .orFail();
};
let academicAdministrationActivities = async () => {
  return await AcademicAdministrationActivity.find({})
    .populate({
      path: "user",
      model: "User",
      populate: [
        { path: "disciplines", model: "Discipline" },
        { path: "position", model: "Position" },
        { path: "workFocus", model: "WorkFocus" }
      ]
    })
    .populate("duty")
    .populate("qualification");
};
let academicAdministrationActivitiesByUser = async (userId: string) => {
  return await AcademicAdministrationActivity.find({ userId: userId })
    .populate({
      path: "user",
      model: "User",
      populate: [
        { path: "disciplines", model: "Discipline" },
        { path: "position", model: "Position" },
        { path: "workFocus", model: "WorkFocus" }
      ]
    })
    .populate("duty")
    .populate("qualification");
};
let addAcademicAdministrationActivity = async (activity: any) => {
  const newActivity = await new AcademicAdministrationActivity(activity);

  return await newActivity.save();
};
let editAcademicAdministrationActivity = async (activity: any) => {
  return await AcademicAdministrationActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  ).orFail();
};
let deleteAcademicAdministrationActivity = async (activity: any) => {
  return await AcademicAdministrationActivity.findOneAndRemove(
    activity
  ).orFail();
};

// WORKLOAD METHODS
let academicAdministrationGlobalTarrif = async () => {
  return parameters.global_academic_administration_tarrif;
};
let academicAdministrationBase = async (activityId: string) => {
  let activity: any = await academicAdministrationActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = serviceHours * 0.25;
  return activityHours;
};
let academicAdministrationTotalHoursPerActivity = async (
  activityId: string
) => {
  const activity: any = await academicAdministrationActivity(activityId);
  if (!activity) {
    throw new Error("AA Activity is not defined");
  }
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);

  return serviceHours / 10;
};
let academicAdministrationTotalHoursPerUser = async (userId: string) => {
  let globalTarrif = await academicAdministrationGlobalTarrif();
  let activities: any[] = await academicAdministrationActivitiesByUser(userId);
  let activityHours = 0;
  for (let activity of activities) {
    activityHours += await academicAdministrationTotalHoursPerActivity(
      activity.activityId
    );
  }

  return activityHours + globalTarrif;
};
let academicAdministrationPercentageOfWorkFocusPerActivity = async (
  activityId: string
) => {
  let activity: any = await academicAdministrationActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await academicAdministrationTotalHoursPerActivity(
    activityId
  );

  return (activityHours / serviceHours) * 100;
};
let academicAdministrationPercentageOfWorkFocusPerUser = async (
  userId: string
) => {
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours = await academicAdministrationTotalHoursPerUser(userId);

  return (activityHours / serviceHours) * 100;
};
let academicAdministrationPercentageOfAnnualHoursPerActivity = async (
  activityId: string
) => {
  let activityHours = await academicAdministrationTotalHoursPerActivity(
    activityId
  );
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let academicAdministrationPercentageOfAnnualHoursPerUser = async (
  userId: string
) => {
  let activityHours = await academicAdministrationTotalHoursPerUser(userId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let academicAdministrationPercentageOfTotalHoursPerActivity = async (
  activityId: string
) => {
  let activity: any = await academicAdministrationActivity(activityId);

  let activityHours = await academicAdministrationTotalHoursPerActivity(
    activityId
  );

  let totalHours = await WorkloadMethods.totalHoursPerUser(activity.userId);

  if (totalHours === undefined) {
    throw new Error("Total hours did not come through");
  }
  return (activityHours / totalHours) * 100;
};
let academicAdministrationPercentageOfTotalHoursPerUser = async (
  userId: string
) => {
  let activityHours = await academicAdministrationTotalHoursPerUser(userId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(userId);
  if (totalHours === undefined) {
    throw new Error("Total hours did not come through");
  }
  return (activityHours / totalHours) * 100;
};

export {
  academicAdministrationActivity,
  academicAdministrationActivities,
  academicAdministrationActivitiesByUser,
  addAcademicAdministrationActivity,
  editAcademicAdministrationActivity,
  deleteAcademicAdministrationActivity,
  academicAdministrationGlobalTarrif,
  academicAdministrationBase,
  academicAdministrationTotalHoursPerActivity,
  academicAdministrationTotalHoursPerUser,
  academicAdministrationPercentageOfWorkFocusPerActivity,
  academicAdministrationPercentageOfWorkFocusPerUser,
  academicAdministrationPercentageOfAnnualHoursPerActivity,
  academicAdministrationPercentageOfAnnualHoursPerUser,
  academicAdministrationPercentageOfTotalHoursPerActivity,
  academicAdministrationPercentageOfTotalHoursPerUser
};
