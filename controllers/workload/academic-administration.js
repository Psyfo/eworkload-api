import * as AcademicAdministrationMethods from './../activity/academic-administration';

import AcademicAdministrationActivity from './../../models/activity/academic-administration-activity';
import AcademicAdministrationWorkload from './../../models/workload/academic-administration';

let initializeAAWorkload = async userId => {
  let aaWorkload = new AcademicAdministrationWorkload({
    userId: userId
  });
  return await aaWorkload.save();
};

let academicAdministrationWorkload = async userId => {
  return await AcademicAdministrationWorkload.findOne({ userId: userId });
};

let addAcademicAdministrationWorkload = async userId => {
  // Only one workload record so delete first if it exists
  try {
    await deleteAcademicAdministrationWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }

  let academicAdministrationWorkloads = [];
  let academicAdministrationActivities = await AcademicAdministrationActivity.find(
    { userId: userId }
  );

  for (let academicAdministrationActivity of academicAdministrationActivities) {
    let activity = await AcademicAdministrationMethods.academicAdministrationActivity(
      academicAdministrationActivity.activityId
    );
    let academicAdministrationTotalHoursPerActivity = await AcademicAdministrationMethods.academicAdministrationTotalHoursPerActivity(
      academicAdministrationActivity.activityId
    );
    let percentageOfWorkFocusPerActivity = await AcademicAdministrationMethods.academicAdministrationPercentageOfWorkFocusPerActivity(
      academicAdministrationActivity.activityId
    );
    let percentageOfAnnualHoursPerActivity = await AcademicAdministrationMethods.academicAdministrationPercentageOfAnnualHoursPerActivity(
      academicAdministrationActivity.activityId
    );
    let percentageOfTotalHoursPerActivity = await AcademicAdministrationMethods.academicAdministrationPercentageOfTotalHoursPerActivity(
      academicAdministrationActivity.activityId
    );
    await academicAdministrationWorkloads.push({
      activity: activity,
      totalHoursPerActivity: academicAdministrationTotalHoursPerActivity,
      percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
      percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
      percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
    });
  }
  let globalTarrif = await AcademicAdministrationMethods.academicAdministrationGlobalTarrif();
  let totalHoursPerUser = await AcademicAdministrationMethods.academicAdministrationTotalHoursPerUser(
    userId
  );
  let percentageOfWorkFocusPerUser = await AcademicAdministrationMethods.academicAdministrationPercentageOfWorkFocusPerUser(
    userId
  );
  let percentageOfAnnualHoursPerUser = await AcademicAdministrationMethods.academicAdministrationPercentageOfAnnualHoursPerUser(
    userId
  );
  let percentageOfTotalHoursPerUser = await AcademicAdministrationMethods.academicAdministrationPercentageOfTotalHoursPerUser(
    userId
  );

  let academicAdministrationWorkload = new AcademicAdministrationWorkload();
  academicAdministrationWorkload = await new AcademicAdministrationWorkload({
    userId: userId,
    academicAdministrationWorkloads: academicAdministrationWorkloads,
    globalTarrif: globalTarrif,
    totalHoursPerUser: totalHoursPerUser,
    percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  });

  await academicAdministrationWorkload.save();

  console.log('Academic Administration Workload saved');
};

let deleteAcademicAdministrationWorkload = async userId => {
  return await AcademicAdministrationWorkload.findOneAndRemove({
    userId: userId
  });
};

export {
  initializeAAWorkload,
  academicAdministrationWorkload,
  addAcademicAdministrationWorkload,
  deleteAcademicAdministrationWorkload
};
