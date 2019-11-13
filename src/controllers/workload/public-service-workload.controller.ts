import * as PublicServiceMethods from "../activity/public-service.controller";

import PublicServiceActivity from "../../models/activity/public-service-activity.model";
import PublicServiceWorkload from "../../models/workload/public-service.model";

let initializePSWorkload = async (userId: string) => {
  let psWorkload = new PublicServiceWorkload({
    userId: userId
  });
  return await psWorkload.save();
};
let publicServiceWorkload = async (userId: string) => {
  return await PublicServiceWorkload.findOne({ userId: userId }).orFail();
};
let calculatePublicServiceWorkload = async (userId: string) => {
  let publicServiceWorkloads = [];
  let activities: any[] = await PublicServiceActivity.find({
    userId: userId
  });

  for (let activity of activities) {
    let publicServiceTotalHoursPerActivity = await PublicServiceMethods.publicServiceTotalHoursPerActivity(
      activity.activityId
    );
    let percentageOfWorkFocusPerActivity = await PublicServiceMethods.publicServicePercentageOfWorkFocusPerActivity(
      activity.activityId
    );
    let percentageOfAnnualHoursPerActivity = await PublicServiceMethods.publicServicePercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
    let percentageOfTotalHoursPerActivity = await PublicServiceMethods.publicServicePercentageOfTotalHoursPerActivity(
      activity.activityId
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

  return await publicServiceWorkload.save();
};
let deletePublicServiceWorkload = async (userId: string) => {
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
