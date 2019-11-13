import * as CommunityInstructionMethods from "../activity/community-instruction.controller";

import CommunityInstructionActivity from "../../models/activity/community-instruction-activity.model";
import CommunityInstructionWorkload from "../../models/workload/community-instruction.model";

let initializeCIWorkload = async (userId: string) => {
  let ciWorkload = new CommunityInstructionWorkload({
    userId: userId
  });
  return await ciWorkload.save();
};
let communityInstructionWorkload = async (userId: string) => {
  return await CommunityInstructionWorkload.findOne({
    userId: userId
  }).orFail();
};
let calculateCommunityInstructionWorkload = async (userId: string) => {
  let communityInstructionWorkloads = [];
  let activities: any[] = await CommunityInstructionActivity.find({
    userId: userId
  });

  for (let activity of activities) {
    let communityInstructionTotalHoursPerActivity = await CommunityInstructionMethods.communityInstructionTotalHoursPerActivity(
      activity.activityId
    );
    let percentageOfWorkFocusPerActivity = await CommunityInstructionMethods.communityInstructionPercentageOfWorkFocusPerActivity(
      activity.activityId
    );
    let percentageOfAnnualHoursPerActivity = await CommunityInstructionMethods.communityInstructionPercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
    let percentageOfTotalHoursPerActivity = await CommunityInstructionMethods.communityInstructionPercentageOfTotalHoursPerActivity(
      activity.activityId
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

  return await communityInstructionWorkload.save();
};
let deleteCommunityInstructionWorkload = async (userId: string) => {
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
