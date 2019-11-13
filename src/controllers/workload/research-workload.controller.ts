import ResearchActivity from "../../models/activity/research-activity.model";
import ResearchWorkload from "../../models/workload/research.model";
import * as ResearchMethods from "../activity/research.controller";

let initializeRWorkload = async (userId: string) => {
  let rWorkload = new ResearchWorkload({
    userId: userId
  });
  return await rWorkload.save();
};
let researchWorkload = async (userId: string) => {
  return await ResearchWorkload.findOne({ userId: userId }).orFail();
};
let calculateResearchWorkload = async (userId: string) => {
  let researchWorkloads = [];
  let activities: any[] = await ResearchActivity.find({
    userId: userId
  });

  for (let activity of activities) {
    let researchTotalHoursPerActivity = await ResearchMethods.researchTotalHoursPerActivity(
      activity.activityId
    );
    let percentageOfWorkFocusPerActivity = await ResearchMethods.researchPercentageOfWorkFocusPerActivity(
      activity.activityId
    );
    let percentageOfAnnualHoursPerActivity = await ResearchMethods.researchPercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
    let percentageOfTotalHoursPerActivity = await ResearchMethods.researchPercentageOfTotalHoursPerActivity(
      activity.activityId
    );
    researchWorkloads.push({
      activity: activity,
      totalHoursPerActivity: researchTotalHoursPerActivity,
      percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
      percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
      percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
    });
  }
  let globalTarrif = await ResearchMethods.researchGlobalTarrif();
  let totalHoursPerUser = await ResearchMethods.researchTotalHoursPerUser(
    userId
  );
  let percentageOfWorkFocusPerUser = await ResearchMethods.researchPercentageOfWorkFocusPerUser(
    userId
  );
  let percentageOfAnnualHoursPerUser = await ResearchMethods.researchPercentageOfAnnualHoursPerUser(
    userId
  );
  let percentageOfTotalHoursPerUser = await ResearchMethods.researchPercentageOfTotalHoursPerUser(
    userId
  );

  let researchWorkload = await new ResearchWorkload();
  researchWorkload = await new ResearchWorkload({
    userId: userId,
    researchWorkloads: researchWorkloads,
    globalTarrif: globalTarrif,
    totalHoursPerUser: totalHoursPerUser,
    percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  });

  return await researchWorkload.save();
};
let deleteResearchWorkload = async (userId: string) => {
  return await ResearchWorkload.findOneAndRemove({
    userId: userId
  });
};

export {
  initializeRWorkload,
  researchWorkload,
  calculateResearchWorkload,
  deleteResearchWorkload
};
