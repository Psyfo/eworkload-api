import * as PersonnelDevelopmentMethods from './../activity/personnel-development';

import PersonnelDevelopmentActivity from './../../models/activity/personnel-development-activity';
import PersonnelDevelopmentWorkload from './../../models/workload/personnel-development';

let initializePDWorkload = async userId => {
  // Only one workload record so delete first if it exists
  try {
    await deletePersonnelDevelopmentWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }
  let pdWorkload = new PersonnelDevelopmentWorkload({
    userId: userId
  });
  return await pdWorkload.save();
};
let personnelDevelopmentWorkload = async userId => {
  return await PersonnelDevelopmentWorkload.findOne({ userId: userId });
};
let calculatePersonnelDevelopmentWorkload = async userId => {
  // Only one workload record so delete first if it exists
  try {
    await deletePersonnelDevelopmentWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }

  let personnelDevelopmentWorkloads = [];
  let personnelDevelopmentActivities = await PersonnelDevelopmentActivity.find({
    userId: userId
  });

  for (let personnelDevelopmentActivity of personnelDevelopmentActivities) {
    let activity = await PersonnelDevelopmentMethods.personnelDevelopmentActivity(
      personnelDevelopmentActivity.activityId
    );
    let personnelDevelopmentTotalHoursPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentTotalHoursPerActivity(
      personnelDevelopmentActivity.activityId
    );
    let percentageOfWorkFocusPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfWorkFocusPerActivity(
      personnelDevelopmentActivity.activityId
    );
    let percentageOfAnnualHoursPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfAnnualHoursPerActivity(
      personnelDevelopmentActivity.activityId
    );
    let percentageOfTotalHoursPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfTotalHoursPerActivity(
      personnelDevelopmentActivity.activityId
    );
    personnelDevelopmentWorkloads.push({
      activity: activity,
      totalHoursPerActivity: personnelDevelopmentTotalHoursPerActivity,
      percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
      percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
      percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
    });
  }
  let globalTarrif = await PersonnelDevelopmentMethods.personnelDevelopmentGlobalTarrif();
  let totalHoursPerUser = await PersonnelDevelopmentMethods.personnelDevelopmentTotalHoursPerUser(
    userId
  );
  let percentageOfWorkFocusPerUser = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfWorkFocusPerUser(
    userId
  );
  let percentageOfAnnualHoursPerUser = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfAnnualHoursPerUser(
    userId
  );
  let percentageOfTotalHoursPerUser = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfTotalHoursPerUser(
    userId
  );

  let personnelDevelopmentWorkload = await new PersonnelDevelopmentWorkload();
  personnelDevelopmentWorkload = await new PersonnelDevelopmentWorkload({
    userId: userId,
    personnelDevelopmentWorkloads: personnelDevelopmentWorkloads,
    globalTarrif: globalTarrif,
    totalHoursPerUser: totalHoursPerUser,
    percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  });

  // await personnelDevelopmentWorkload.save();

  console.log('Personnel Development Workload created');
  return personnelDevelopmentWorkload;
};
let deletePersonnelDevelopmentWorkload = async userId => {
  return await PersonnelDevelopmentWorkload.findOneAndRemove({
    userId: userId
  });
};

export {
  initializePDWorkload,
  personnelDevelopmentWorkload,
  calculatePersonnelDevelopmentWorkload,
  deletePersonnelDevelopmentWorkload
};
