import * as CommunityInstructionMethods from './../activity/community-instruction';

import CommunityInstructionActivity from './../../models/activity/community-instruction-activity';
import CommunityInstructionWorkload from './../../models/workload/community-instruction';

let initializeCIWorkload = async userId => {
  // Only one workload record so delete first if it exists
  try {
    await deleteCommunityInstructionWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }
  let ciWorkload = new CommunityInstructionWorkload({
    userId: userId
  });
  return await ciWorkload.save();
};
let communityInstructionWorkload = async userId => {
  return await CommunityInstructionWorkload.findOne({ userId: userId });
};
let calculateCommunityInstructionWorkload = async userId => {
  // Only one workload record so delete first if it exists
  try {
    await deleteCommunityInstructionWorkload(userId);
  } catch (error) {
    console.log(error);
    console.log('No record found');
  }

  let communityInstructionWorkloads = [];
  let communityInstructionActivities = await CommunityInstructionActivity.find({
    userId: userId
  });

  for (let communityInstructionActivity of communityInstructionActivities) {
    let activity = await CommunityInstructionMethods.communityInstructionActivity(
      communityInstructionActivity.activityId
    );
    let communityInstructionTotalHoursPerActivity = await CommunityInstructionMethods.communityInstructionTotalHoursPerActivity(
      communityInstructionActivity.activityId
    );
    let percentageOfWorkFocusPerActivity = await CommunityInstructionMethods.communityInstructionPercentageOfWorkFocusPerActivity(
      communityInstructionActivity.activityId
    );
    let percentageOfAnnualHoursPerActivity = await CommunityInstructionMethods.communityInstructionPercentageOfAnnualHoursPerActivity(
      communityInstructionActivity.activityId
    );
    let percentageOfTotalHoursPerActivity = await CommunityInstructionMethods.communityInstructionPercentageOfTotalHoursPerActivity(
      communityInstructionActivity.activityId
    );
    communityInstructionWorkloads.push({
      activity: activity,
      totalHoursPerActivity: communityInstructionTotalHoursPerActivity,
      percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
      percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
      percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
    });
  }
  let globalTarrif = await CommunityInstructionMethods.communityInstructionGlobalTarrif();
  let totalHoursPerUser = await CommunityInstructionMethods.communityInstructionTotalHoursPerUser(
    userId
  );
  let percentageOfWorkFocusPerUser = await CommunityInstructionMethods.communityInstructionPercentageOfWorkFocusPerUser(
    userId
  );
  let percentageOfAnnualHoursPerUser = await CommunityInstructionMethods.communityInstructionPercentageOfAnnualHoursPerUser(
    userId
  );
  let percentageOfTotalHoursPerUser = await CommunityInstructionMethods.communityInstructionPercentageOfTotalHoursPerUser(
    userId
  );

  let communityInstructionWorkload = await new CommunityInstructionWorkload();
  communityInstructionWorkload = await new CommunityInstructionWorkload({
    userId: userId,
    communityInstructionWorkloads: communityInstructionWorkloads,
    globalTarrif: globalTarrif,
    totalHoursPerUser: totalHoursPerUser,
    percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  });

  // await communityInstructionWorkload.save();

  console.log('Community Instruction Workload created');
  return communityInstructionWorkload;
};
let deleteCommunityInstructionWorkload = async userId => {
  return await CommunityInstructionWorkload.findOneAndRemove({
    userId: userId
  });
};

export {
  initializeCIWorkload,
  communityInstructionWorkload,
  calculateCommunityInstructionWorkload,
  deleteCommunityInstructionWorkload
};
