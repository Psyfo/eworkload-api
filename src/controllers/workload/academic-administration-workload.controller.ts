import * as AcademicAdministrationMethods from '../activity/academic-administration.controller';

import AcademicAdministrationWorkload from '../../models/workload/academic-administration.model';
import IAcademicAdministrationActivity from 'interfaces/activity/academic-administration-activity.interface';
import IAcademicAdministrationWorkload from 'interfaces/workload/academic-administration-workload.interface';

let initializeAAWorkload = async (userId: string) => {
  // Only one workload record so delete first if it exists
  try {
    await deleteAcademicAdministrationWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }
  let aaWorkload = new AcademicAdministrationWorkload({
    userId: userId
  });
  return await aaWorkload.save();
};
let academicAdministrationWorkload = async (userId: string) => {
  return await AcademicAdministrationWorkload.findOne({ userId: userId });
};
let calculateAcademicAdministrationWorkload = async (userId: string) => {
  // Only one workload record so delete first if it exists
  try {
    await deleteAcademicAdministrationWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }

  let academicAdministrationWorkloads = [];
  let activities: any[] = await AcademicAdministrationMethods.academicAdministrationActivitiesByUser(
    userId
  );

  // Iterate through activities to calculate per-activity workloads
  for (let activity of activities) {
    let academicAdministrationTotalHoursPerActivity: number = await AcademicAdministrationMethods.academicAdministrationTotalHoursPerActivity(
      activity.activityId
    );
    let percentageOfWorkFocusPerActivity: number = await AcademicAdministrationMethods.academicAdministrationPercentageOfWorkFocusPerActivity(
      activity.activityId
    );
    let percentageOfAnnualHoursPerActivity: number = await AcademicAdministrationMethods.academicAdministrationPercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
    let percentageOfTotalHoursPerActivity: number = await AcademicAdministrationMethods.academicAdministrationPercentageOfTotalHoursPerActivity(
      activity.activityId
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

  let academicAdministrationWorkload = await new AcademicAdministrationWorkload();
  academicAdministrationWorkload = await new AcademicAdministrationWorkload({
    userId: userId,
    academicAdministrationWorkloads: academicAdministrationWorkloads,
    globalTarrif: globalTarrif,
    totalHoursPerUser: totalHoursPerUser,
    percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  });

  // await academicAdministrationWorkload.save();

  console.log('Academic Administration Workload created');
  return await academicAdministrationWorkload; // send model
};
let deleteAcademicAdministrationWorkload = async (userId: string) => {
  return await AcademicAdministrationWorkload.findOneAndRemove({
    userId: userId
  });
};

export {
  initializeAAWorkload,
  academicAdministrationWorkload,
  calculateAcademicAdministrationWorkload,
  deleteAcademicAdministrationWorkload
};
