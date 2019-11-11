import parameters from '../../config/parameters';
import ResearchActivity from '../../models/activity/research-activity.model';
import * as WorkFocusMethods from '../work-focus.controller';
import * as WorkloadMethods from '../workload.controller';

// RESEARCH METHODS
let researchActivity = async (activityId: string) => {
  return await ResearchActivity.findOne({ activityId: activityId })
    .populate({
      path: 'user',
      model: 'User',
      populate: [
        { path: 'disciplines', model: 'Discipline' },
        { path: 'position', model: 'Position' },
        { path: 'workFocus', model: 'WorkFocus' }
      ]
    })
    .populate('duty');
};
let researchActivities = async () => {
  return await ResearchActivity.find({})
    .populate({
      path: 'user',
      model: 'User',
      populate: [
        { path: 'disciplines', model: 'Discipline' },
        { path: 'position', model: 'Position' },
        { path: 'workFocus', model: 'WorkFocus' }
      ]
    })
    .populate('duty');
};
let researchActivitiesByUser = async (userId: string) => {
  return await ResearchActivity.find({ userId: userId })
    .populate({
      path: 'user',
      model: 'User',
      populate: [
        { path: 'disciplines', model: 'Discipline' },
        { path: 'position', model: 'Position' },
        { path: 'workFocus', model: 'WorkFocus' }
      ]
    })
    .populate('duty');
};
let addResearchActivity = async (activity: any) => {
  const newResearchActivity = await new ResearchActivity(activity);

  return await newResearchActivity.save();
};
let editResearchActivity = async (activity: any) => {
  return await ResearchActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};
let deleteResearchActivity = async (activity: any) => {
  return await ResearchActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS
let researchGlobalTarrif = async () => {
  return parameters.global_research_tarrif;
};
let researchTotalHoursPerActivity = async (activityId: string) => {
  let activity: any = await researchActivity(activityId);

  let totalHours = 60;
  if (
    activity.output === 'Conference Proceedings' &&
    activity.conferenceActivities.length
  ) {
    if (
      activity.conferenceActivities.find(
        (detail: string) => detail === 'Presented Paper'
      )
    ) {
      totalHours = 60;
    } else if (
      activity.conferenceActivities.find(
        (detail: string) => detail === 'Keynote address'
      )
    ) {
      totalHours = 120;
    }
  } else if (activity.output === 'Journal') {
    totalHours === 120;
  } else {
    totalHours = 60;
  }

  return totalHours;
};
let researchTotalHoursPerUser = async (userId: string) => {
  let globalTarrif = await researchGlobalTarrif();
  let activities: any[] = await researchActivitiesByUser(userId);
  let activityHours = 0;
  for (let activity of activities) {
    activityHours += await researchTotalHoursPerActivity(activity.activityId);
  }

  return activityHours + globalTarrif;
};
let researchPercentageOfWorkFocusPerActivity = async (activityId: string) => {
  let activity: any = await researchActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await researchTotalHoursPerActivity(activityId);

  return (activityHours / serviceHours) * 100;
};
let researchPercentageOfWorkFocusPerUser = async (userId: string) => {
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours = await researchTotalHoursPerUser(userId);

  return (activityHours / serviceHours) * 100;
};
let researchPercentageOfAnnualHoursPerActivity = async (activityId: string) => {
  let activityHours = await researchTotalHoursPerActivity(activityId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let researchPercentageOfAnnualHoursPerUser = async (userId: string) => {
  let activityHours = await researchTotalHoursPerUser(userId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let researchPercentageOfTotalHoursPerActivity = async (activityId: string) => {
  let activity: any = await researchActivity(activityId);
  let activityHours = await researchTotalHoursPerActivity(activityId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(activity.userId);
  if (totalHours === undefined) {
    throw new Error('Total hours is undefined');
  }
  return (activityHours / totalHours) * 100;
};
let researchPercentageOfTotalHoursPerUser = async (userId: string) => {
  let activityHours = await researchTotalHoursPerUser(userId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(userId);
  if (totalHours === undefined) {
    throw new Error('Total hours is undefined');
  }
  return (activityHours / totalHours) * 100;
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
  researchPercentageOfAnnualHoursPerUser,
  researchPercentageOfTotalHoursPerActivity,
  researchPercentageOfTotalHoursPerUser
};
