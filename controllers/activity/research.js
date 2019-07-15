import ResearchActivity from '../../models/activity/research-activity';
import * as WorkFocusMethods from './../work-focus';
import parameters from './../../config/parameters';

// RESEARCH METHODS
let researchActivity = async activityId => {
  return await ResearchActivity.findOne({ activityId: activityId });
};
let researchActivities = async () => {
  return await ResearchActivity.find({});
};
let researchActivitiesByUser = async userId => {
  return await ResearchActivity.find({ userId: userId });
};
let addResearchActivity = async activity => {
  const newResearchActivity = await new ResearchActivity(activity);

  return await newResearchActivity.save();
};
let editResearchActivity = async activity => {
  return await ResearchActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { updert: true }
  );
};
let deleteResearchActivity = async activity => {
  return await ResearchActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS
let researchGlobalTarrif = async () => {
  return parameters.global_public_service_tarrif;
};
let researchTotalHoursPerActivity = async activityId => {
  let activity = await researchActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);

  return Math.round(serviceHours / 10);
};
let researchTotalHoursPerUser = async userId => {
  let globalTarrif = await researchGlobalTarrif();
  let activities = await researchActivitiesByUser(userId);
  let count = activities.length;
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours = Math.round((count * serviceHours) / 10);

  return activityHours + globalTarrif;
};
let researchPercentageOfWorkFocusPerActivity = async activityId => {
  let activity = await researchActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await researchTotalHoursPerActivity(activityId);

  return Math.round((activityHours / serviceHours) * 100);
};
let researchPercentageOfWorkFocusPerUser = async userId => {
  let globalTarrif = await researchGlobalTarrif();
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours = (await researchTotalHoursPerUser(userId)) + globalTarrif;

  return Math.round((activityHours / serviceHours) * 100);
};
let researchPercentageOfAnnualHoursPerActivity = async activityId => {
  let activityHours = await researchTotalHoursPerActivity(activityId);
  let annualHours = parameters.annual_total_hours;

  return Math.round((activityHours / annualHours) * 100);
};
let researchPercentageOfAnnualHoursPerUser = async userId => {
  let globalTarrif = await researchGlobalTarrif();
  let activityHours = (await researchTotalHoursPerUser(userId)) + globalTarrif;
  let annualHours = parameters.annual_total_hours;

  return Math.round((activityHours / annualHours) * 100);
};

export {
  researchActivity,
  researchActivities,
  researchActivitiesByUser,
  addResearchActivity,
  editResearchActivity,
  deleteResearchActivity,
  researchGlobalTarrif,
  researchTotalHoursPerActivity,
  researchTotalHoursPerUser,
  researchPercentageOfWorkFocusPerActivity,
  researchPercentageOfWorkFocusPerUser,
  researchPercentageOfAnnualHoursPerActivity,
  researchPercentageOfAnnualHoursPerUser
};
