import ResearchActivity from '../../models/activity/research-activity';
import * as AAWorkloadMethods from './../workload/academic-administration';
import * as CIWorkloadMethods from '../../controllers/workload/community-instruction';
import * as EMWorkloadMethods from '../../controllers/workload/executive-management';
import * as FIWorkloadMethods from '../../controllers/workload/formal-instruction';
import * as PDWorkloadMethods from '../../controllers/workload/personnel-development';
import * as PSWorkloadMethods from '../../controllers/workload/public-service';
import * as RWorkloadMethods from '../../controllers/workload/research';
import * as SWorkloadMethods from '../../controllers/workload/supervision';
import * as WorkFocusMethods from './../work-focus';
import * as WorkloadMethods from './../workload';
import parameters from './../../config/parameters';

// RESEARCH METHODS
let researchActivity = async activityId => {
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
let researchActivitiesByUser = async userId => {
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
let addResearchActivity = async activity => {
  const newResearchActivity = await new ResearchActivity(activity);

  await newResearchActivity.save();

  // Write workload data
  try {
    await AAWorkloadMethods.addAcademicAdministrationWorkload(
      newResearchActivity.userId
    );
    await CIWorkloadMethods.addCommunityInstructionWorkload(
      newResearchActivity.userId
    );
    await EMWorkloadMethods.addExecutiveManagementWorkload(
      newResearchActivity.userId
    );
    await FIWorkloadMethods.addFormalInstructionWorkload(
      newResearchActivity.userId
    );
    await PDWorkloadMethods.addPersonnelDevelopmentWorkload(
      newResearchActivity.userId
    );
    await PSWorkloadMethods.addPublicServiceWorkload(
      newResearchActivity.userId
    );
    await RWorkloadMethods.addResearchWorkload(newResearchActivity.userId);
    await SWorkloadMethods.addSupervisionWorkload(newResearchActivity.userId);
  } catch (error) {
    console.log(error);
  }

  // Return activity
  return await researchActivity(newResearchActivity.activityId);
};
let editResearchActivity = async activity => {
  return await ResearchActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};
let deleteResearchActivity = async activity => {
  const deletedActivity = await ResearchActivity.findOneAndRemove(activity);

  // Write workload data
  try {
    await AAWorkloadMethods.addAcademicAdministrationWorkload(
      deletedActivity.userId
    );
    await CIWorkloadMethods.addCommunityInstructionWorkload(
      deletedActivity.userId
    );
    await EMWorkloadMethods.addExecutiveManagementWorkload(
      deletedActivity.userId
    );
    await FIWorkloadMethods.addFormalInstructionWorkload(
      deletedActivity.userId
    );
    await PDWorkloadMethods.addPersonnelDevelopmentWorkload(
      deletedActivity.userId
    );
    await PSWorkloadMethods.addPublicServiceWorkload(deletedActivity.userId);
    await RWorkloadMethods.addResearchWorkload(deletedActivity.userId);
    await SWorkloadMethods.addSupervisionWorkload(deletedActivity.userId);
  } catch (error) {
    console.log(error);
  }

  // Return activity
  return deletedActivity;
};

// WORKLOAD METHODS
let researchGlobalTarrif = async () => {
  return parameters.global_research_tarrif;
};
let researchTotalHoursPerActivity = async activityId => {
  let activity = await researchActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);

  return serviceHours / 10;
};
let researchTotalHoursPerUser = async userId => {
  let globalTarrif = await researchGlobalTarrif();
  let activities = await researchActivitiesByUser(userId);
  let activityHours = 0;
  for (let activity of activities) {
    activityHours += await researchTotalHoursPerActivity(activity.activityId);
  }

  return activityHours + globalTarrif;
};
let researchPercentageOfWorkFocusPerActivity = async activityId => {
  let activity = await researchActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await researchTotalHoursPerActivity(activityId);

  return (activityHours / serviceHours) * 100;
};
let researchPercentageOfWorkFocusPerUser = async userId => {
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours = await researchTotalHoursPerUser(userId);

  return (activityHours / serviceHours) * 100;
};
let researchPercentageOfAnnualHoursPerActivity = async activityId => {
  let activityHours = await researchTotalHoursPerActivity(activityId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let researchPercentageOfAnnualHoursPerUser = async userId => {
  let activityHours = await researchTotalHoursPerUser(userId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let researchPercentageOfTotalHoursPerActivity = async activityId => {
  let activity = await researchActivity(activityId);
  let activityHours = await researchTotalHoursPerActivity(activityId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(activity.userId);

  return (activityHours / totalHours) * 100;
};
let researchPercentageOfTotalHoursPerUser = async userId => {
  let activityHours = await researchTotalHoursPerUser(userId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(userId);

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
