import CommunityInstructionActivity from '../models/community-instruction-activity';
import parameters from '../config/parameters';
// import User from '../models/user';
// import Student from '../models/student';
// import parameters from '../config/parameters';

// FI METHODS
let communityInstructionActivity = async activityId => {
  return await CommunityInstructionActivity.findOne({ activityId: activityId });
};

let communityInstructionActivities = async () => {
  return await CommunityInstructionActivity.find({});
};

let communityInstructionActivitiesByUser = async userId => {
  return await CommunityInstructionActivity.find({ userId: userId });
};

let addCommunityInstructionActivity = async activity => {
  const newCommunityInstructionActivity = await new CommunityInstructionActivity(
    activity
  );

  return await newCommunityInstructionActivity.save();
};

let editCommunityInstructionActivity = async activity => {
  return await CommunityInstructionActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};

let deleteCommunityInstructionActivity = async activity => {
  return await CommunityInstructionActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS

let globalTarrif = async () => {
  return parameters.global_communityInstruction_tarrif;
};

export {
  communityInstructionActivity,
  communityInstructionActivities,
  communityInstructionActivitiesByUser,
  addCommunityInstructionActivity,
  editCommunityInstructionActivity,
  deleteCommunityInstructionActivity,
  globalTarrif
};
