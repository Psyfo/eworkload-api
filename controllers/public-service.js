import PublicServiceActivity from '../models/public-service-activity';
import parameters from '../config/parameters';
// import User from '../models/user';
// import Student from '../models/student';
// import parameters from '../config/parameters';

// FI METHODS
let publicServiceActivity = async activityId => {
  return await PublicServiceActivity.findOne({ activityId: activityId });
};

let publicServiceActivities = async () => {
  return await PublicServiceActivity.find({});
};

let publicServiceActivitiesByUser = async userId => {
  return await PublicServiceActivity.find({ userId: userId });
};

let addPublicServiceActivity = async activity => {
  const newPublicServiceActivity = await new PublicServiceActivity(activity);

  return await newPublicServiceActivity.save();
};

let editPublicServiceActivity = async activity => {
  return await PublicServiceActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};

let deletePublicServiceActivity = async activity => {
  return await PublicServiceActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS

let globalTarrif = async () => {
  return parameters.global_publicService_tarrif;
};

export {
  publicServiceActivity,
  publicServiceActivities,
  publicServiceActivitiesByUser,
  addPublicServiceActivity,
  editPublicServiceActivity,
  deletePublicServiceActivity,
  globalTarrif
};
