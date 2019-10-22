import AcademicAdministrationActivity from '../../models/activity/academic-administration-activity';
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

// AA METHODS
let academicAdministrationActivity = async activityId => {
  return await AcademicAdministrationActivity.findOne({
    activityId: activityId
  })
    .populate({
      path: 'user',
      model: 'User',
      populate: [
        { path: 'disciplines', model: 'Discipline' },
        { path: 'position', model: 'Position' },
        { path: 'workFocus', model: 'WorkFocus' }
      ]
    })
    .populate('duty')
    .populate('qualification');
};
let academicAdministrationActivities = async () => {
  return await AcademicAdministrationActivity.find({})
    .populate({
      path: 'user',
      model: 'User',
      populate: [
        { path: 'disciplines', model: 'Discipline' },
        { path: 'position', model: 'Position' },
        { path: 'workFocus', model: 'WorkFocus' }
      ]
    })
    .populate('duty')
    .populate('qualification');
};
let academicAdministrationActivitiesByUser = async userId => {
  return await AcademicAdministrationActivity.find({ userId: userId })
    .populate({
      path: 'user',
      model: 'User',
      populate: [
        { path: 'disciplines', model: 'Discipline' },
        { path: 'position', model: 'Position' },
        { path: 'workFocus', model: 'WorkFocus' }
      ]
    })
    .populate('duty')
    .populate('qualification');
};
let addAcademicAdministrationActivity = async activity => {
  const newAcademicAdministrationActivity = await new AcademicAdministrationActivity(
    activity
  );

  await newAcademicAdministrationActivity.save();

  // Write workload data
  try {
    await AAWorkloadMethods.addAcademicAdministrationWorkload(
      newAcademicAdministrationActivity.userId
    );
    await CIWorkloadMethods.addCommunityInstructionWorkload(
      newAcademicAdministrationActivity.userId
    );
    await EMWorkloadMethods.addExecutiveManagementWorkload(
      newAcademicAdministrationActivity.userId
    );
    await FIWorkloadMethods.addFormalInstructionWorkload(
      newAcademicAdministrationActivity.userId
    );
    await PDWorkloadMethods.addPersonnelDevelopmentWorkload(
      newAcademicAdministrationActivity.userId
    );
    await PSWorkloadMethods.addPublicServiceWorkload(
      newAcademicAdministrationActivity.userId
    );
    await RWorkloadMethods.addResearchWorkload(
      newAcademicAdministrationActivity.userId
    );
    await SWorkloadMethods.addSupervisionWorkload(
      newAcademicAdministrationActivity.userId
    );
  } catch (error) {
    console.log(error);
  }

  // Return activity
  return await academicAdministrationActivity(
    newAcademicAdministrationActivity.activityId
  );
};
let editAcademicAdministrationActivity = async activity => {
  return await AcademicAdministrationActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};
let deleteAcademicAdministrationActivity = async activity => {
  const deletedActivity = await AcademicAdministrationActivity.findOneAndRemove(
    activity
  );

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
let academicAdministrationGlobalTarrif = async () => {
  return parameters.global_academic_administration_tarrif;
};
let academicAdministrationBase = async activityId => {
  let activity = await academicAdministrationActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = serviceHours * 0.25;
  return activityHours;
};
let academicAdministrationTotalHoursPerActivity = async activityId => {
  let activity = await academicAdministrationActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);

  return serviceHours / 10;
};
let academicAdministrationTotalHoursPerUser = async userId => {
  let globalTarrif = await academicAdministrationGlobalTarrif();
  let activities = await academicAdministrationActivitiesByUser(userId);
  let activityHours = 0;
  for (let activity of activities) {
    activityHours += await academicAdministrationTotalHoursPerActivity(
      activity.activityId
    );
  }

  return activityHours + globalTarrif;
};
let academicAdministrationPercentageOfWorkFocusPerActivity = async activityId => {
  let activity = await academicAdministrationActivity(activityId);
  let serviceHours = await WorkFocusMethods.serviceHours(activity.userId);
  let activityHours = await academicAdministrationTotalHoursPerActivity(
    activityId
  );

  return (activityHours / serviceHours) * 100;
};
let academicAdministrationPercentageOfWorkFocusPerUser = async userId => {
  let serviceHours = await WorkFocusMethods.serviceHours(userId);
  let activityHours = await academicAdministrationTotalHoursPerUser(userId);

  return (activityHours / serviceHours) * 100;
};
let academicAdministrationPercentageOfAnnualHoursPerActivity = async activityId => {
  let activityHours = await academicAdministrationTotalHoursPerActivity(
    activityId
  );
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let academicAdministrationPercentageOfAnnualHoursPerUser = async userId => {
  let activityHours = await academicAdministrationTotalHoursPerUser(userId);
  let annualHours = parameters.annual_total_hours;

  return (activityHours / annualHours) * 100;
};
let academicAdministrationPercentageOfTotalHoursPerActivity = async activityId => {
  let activity = await academicAdministrationActivity(activityId);

  let activityHours = await academicAdministrationTotalHoursPerActivity(
    activityId
  );

  let totalHours = await WorkloadMethods.totalHoursPerUser(activity.userId);

  return (activityHours / totalHours) * 100;
};
let academicAdministrationPercentageOfTotalHoursPerUser = async userId => {
  let activityHours = await academicAdministrationTotalHoursPerUser(userId);
  let totalHours = await WorkloadMethods.totalHoursPerUser(userId);

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
