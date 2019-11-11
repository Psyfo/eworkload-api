import ResearchActivity from '../../models/activity/research-activity.model';
import ResearchWorkload from '../../models/workload/research.model';
import * as ResearchMethods from '../activity/research.controller';

let initializeRWorkload = async (userId: string) => {
  // Only one workload record so delete first if it exists
  try {
    await deleteResearchWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }
  let rWorkload = new ResearchWorkload({
    userId: userId
  });
  return await rWorkload.save();
};
let researchWorkload = async (userId: string) => {
  return await ResearchWorkload.findOne({ userId: userId });
};
let calculateResearchWorkload = async (userId: string) => {
  // Only one workload record so delete first if it exists
  try {
    await deleteResearchWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }

  let researchWorkloads = [];
  let researchActivities: any[] = await ResearchActivity.find({
    userId: userId
  });

  for (let researchActivity of researchActivities) {
    let activity: any = await ResearchMethods.researchActivity(
      researchActivity.activityId
    );
    let researchTotalHoursPerActivity = await ResearchMethods.researchTotalHoursPerActivity(
      researchActivity.activityId
    );
    let percentageOfWorkFocusPerActivity = await ResearchMethods.researchPercentageOfWorkFocusPerActivity(
      researchActivity.activityId
    );
    let percentageOfAnnualHoursPerActivity = await ResearchMethods.researchPercentageOfAnnualHoursPerActivity(
      researchActivity.activityId
    );
    let percentageOfTotalHoursPerActivity = await ResearchMethods.researchPercentageOfTotalHoursPerActivity(
      researchActivity.activityId
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

  //await researchWorkload.save();

  console.log('Research Workload created');
  return researchWorkload;
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
