import * as PublicServiceMethods from './../activity/public-service';

import PublicServiceActivity from './../../models/activity/public-service-activity';
import PublicServiceWorkload from './../../models/workload/public-service';

let initializePSWorkload = async userId => {
  let psWorkload = new PublicServiceWorkload({
    userId: userId
  });
  return await psWorkload.save();
};
let publicServiceWorkload = async userId => {
  return await PublicServiceWorkload.findOne({ userId: userId });
};
let calculatePublicServiceWorkload = async userId => {
  // Only one workload record so delete first if it exists
  try {
    await deletePublicServiceWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }

  let publicServiceWorkloads = [];
  let publicServiceActivities = await PublicServiceActivity.find({
    userId: userId
  });

  for (let publicServiceActivity of publicServiceActivities) {
    let activity = await PublicServiceMethods.publicServiceActivity(
      publicServiceActivity.activityId
    );
    let publicServiceTotalHoursPerActivity = await PublicServiceMethods.publicServiceTotalHoursPerActivity(
      publicServiceActivity.activityId
    );
    let percentageOfWorkFocusPerActivity = await PublicServiceMethods.publicServicePercentageOfWorkFocusPerActivity(
      publicServiceActivity.activityId
    );
    let percentageOfAnnualHoursPerActivity = await PublicServiceMethods.publicServicePercentageOfAnnualHoursPerActivity(
      publicServiceActivity.activityId
    );
    let percentageOfTotalHoursPerActivity = await PublicServiceMethods.publicServicePercentageOfTotalHoursPerActivity(
      publicServiceActivity.activityId
    );
    publicServiceWorkloads.push({
      activity: activity,
      totalHoursPerActivity: publicServiceTotalHoursPerActivity,
      percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
      percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
      percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
    });
  }
  let globalTarrif = await PublicServiceMethods.publicServiceGlobalTarrif();
  let totalHoursPerUser = await PublicServiceMethods.publicServiceTotalHoursPerUser(
    userId
  );
  let percentageOfWorkFocusPerUser = await PublicServiceMethods.publicServicePercentageOfWorkFocusPerUser(
    userId
  );
  let percentageOfAnnualHoursPerUser = await PublicServiceMethods.publicServicePercentageOfAnnualHoursPerUser(
    userId
  );
  let percentageOfTotalHoursPerUser = await PublicServiceMethods.publicServicePercentageOfTotalHoursPerUser(
    userId
  );

  let publicServiceWorkload = await new PublicServiceWorkload();
  publicServiceWorkload = await new PublicServiceWorkload({
    userId: userId,
    publicServiceWorkloads: publicServiceWorkloads,
    globalTarrif: globalTarrif,
    totalHoursPerUser: totalHoursPerUser,
    percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  });

  // await publicServiceWorkload.save();

  console.log('Public Service Workload created');
  return publicServiceWorkload;
};
let deletePublicServiceWorkload = async userId => {
  return await PublicServiceWorkload.findOneAndRemove({
    userId: userId
  });
};

export {
  initializePSWorkload,
  publicServiceWorkload,
  calculatePublicServiceWorkload,
  deletePublicServiceWorkload
};
