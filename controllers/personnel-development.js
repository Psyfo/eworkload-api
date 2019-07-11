import PersonnelDevelopmentActivity from '../models/personnel-development-activity';
import parameters from '../config/parameters';

// FI METHODS
let personnelDevelopmentActivity = async activityId => {
  return await PersonnelDevelopmentActivity.findOne({ activityId: activityId });
};

let personnelDevelopmentActivities = async () => {
  return await PersonnelDevelopmentActivity.find({});
};

let personnelDevelopmentActivitiesByUser = async userId => {
  return await PersonnelDevelopmentActivity.find({ userId: userId });
};

let addPersonnelDevelopmentActivity = async activity => {
  const newPersonnelDevelopmentActivity = await new PersonnelDevelopmentActivity(
    activity
  );

  return await newPersonnelDevelopmentActivity.save();
};

let editPersonnelDevelopmentActivity = async activity => {
  return await PersonnelDevelopmentActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};

let deletePersonnelDevelopmentActivity = async activity => {
  return await PersonnelDevelopmentActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS

let globalTarrif = async () => {
  return parameters.global_personnel_development_tarrif;
};

export {
  personnelDevelopmentActivity,
  personnelDevelopmentActivities,
  personnelDevelopmentActivitiesByUser,
  addPersonnelDevelopmentActivity,
  editPersonnelDevelopmentActivity,
  deletePersonnelDevelopmentActivity,
  globalTarrif
};
