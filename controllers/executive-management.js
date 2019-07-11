import ExecutiveManagementActivity from '../models/executive-management-activity';
import parameters from '../config/parameters';

// PD METHODS
let personnelDevelopmentActivity = async activityId => {
  return await ExecutiveManagementActivity.findOne({ activityId: activityId });
};

let personnelDevelopmentActivities = async () => {
  return await ExecutiveManagementActivity.find({});
};

let personnelDevelopmentActivitiesByUser = async userId => {
  return await ExecutiveManagementActivity.find({ userId: userId });
};

let addExecutiveManagementActivity = async activity => {
  const newExecutiveManagementActivity = await new ExecutiveManagementActivity(
    activity
  );

  return await newExecutiveManagementActivity.save();
};

let editExecutiveManagementActivity = async activity => {
  return await ExecutiveManagementActivity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};

let deleteExecutiveManagementActivity = async activity => {
  return await ExecutiveManagementActivity.findOneAndRemove(activity);
};

// WORKLOAD METHODS
let globalTarrif = async () => {
  return parameters.global_executive_management_tarrif;
};

export {
  personnelDevelopmentActivity,
  personnelDevelopmentActivities,
  personnelDevelopmentActivitiesByUser,
  addExecutiveManagementActivity,
  editExecutiveManagementActivity,
  deleteExecutiveManagementActivity,
  globalTarrif
};
