import SupervisionActivity from '../models/supervision-activity';
import parameters from '../config/parameters';
// import User from '../models/user';
// import Student from '../models/student';
// import parameters from '../config/parameters';

// FI METHODS
let supervisionActivity = async activityId => {
  return await SupervisionActivity.findOne({ activityId: activityId });
};

let supervisionActivities = async () => {
  return await SupervisionActivity.find({});
};

let supervisionActivitiesByUser = async userId => {
  return await SupervisionActivity.find({ userId: userId });
};

let addSupervisionActivity = async activity => {
  const newSupervisionActivity = await new SupervisionActivity(activity);

  return await newSupervisionActivity.save();
};

let editSupervisionActivity = async activity => {
  return await SupervisionActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};

let deleteSupervisionActivity = async activity => {
  return await SupervisionActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS

let globalTarrif = async () => {
  return parameters.global_supervision_tarrif;
};

export {
  supervisionActivity,
  supervisionActivities,
  supervisionActivitiesByUser,
  addSupervisionActivity,
  editSupervisionActivity,
  deleteSupervisionActivity,
  globalTarrif
};
