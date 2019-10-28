import * as ResearchMethods from './../activity/research';

import ResearchActivity from './../../models/activity/research-activity';
import ResearchWorkload from './../../models/workload/research';

let initializeRWorkload = async userId => {
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
let researchWorkload = async userId => {
  return await ResearchWorkload.findOne({ userId: userId });
};
let calculateResearchWorkload = async userId => {
  // Only one workload record so delete first if it exists
  try {
    await deleteResearchWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }

  let researchWorkloads = [];
  let researchActivities = await ResearchActivity.find({ userId: userId });

  for (let researchActivity of researchActivities) {
    let activity = await ResearchMethods.researchActivity(
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
let deleteResearchWorkload = async userId => {
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
