import PersonnelDevelopmentActivity from "../../models/activity/personnel-development-activity.model";
import PersonnelDevelopmentWorkload from "../../models/workload/personnel-development.model";
import * as PersonnelDevelopmentMethods from "../activity/personnel-development.controller";

let initializePDWorkload = async (userId: string) => {
  let pdWorkload = new PersonnelDevelopmentWorkload({
    userId: userId
  });
  return await pdWorkload.save();
};
let personnelDevelopmentWorkload = async (userId: string) => {
  return await PersonnelDevelopmentWorkload.findOne({
    userId: userId
  }).orFail();
};
let calculatePersonnelDevelopmentWorkload = async (userId: string) => {
  let personnelDevelopmentWorkloads = [];
  let activities: any[] = await PersonnelDevelopmentActivity.find({
    userId: userId
  });

  for (let activity of activities) {
    let personnelDevelopmentTotalHoursPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentTotalHoursPerActivity(
      activity.activityId
    );
    let percentageOfWorkFocusPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfWorkFocusPerActivity(
      activity.activityId
    );
    let percentageOfAnnualHoursPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
    let percentageOfTotalHoursPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfTotalHoursPerActivity(
      activity.activityId
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

  return await personnelDevelopmentWorkload.save();
};
let deletePersonnelDevelopmentWorkload = async (userId: string) => {
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
