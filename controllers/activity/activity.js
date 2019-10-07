import Activity from '../../models/activity/activity';

let activity = async activityId => {
  return await Activity.findOne({ activityId: activityId });
};
let activities = async () => {
  return await Activity.find({});
};
let activitiesByUser = async userId => {
  return await Activity.find({ userId: userId });
};
let addActivity = async activity => {
  const newActivity = await new Activity(activity);

  return newActivity.save();
};
let editActivity = async activity => {
  return await Activity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};
let deleteActivity = async activity => {
  return await Activity.findOneAndRemove(activity);
};

// WORKLOAD METHODS

export {
  activity,
  activities,
  activitiesByUser,
  addActivity,
  editActivity,
  deleteActivity
};
