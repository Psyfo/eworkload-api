import Activity from '../../models/activity/activity.model';

let activity = async (activityId: string) => {
  return await Activity.findOne({ activityId: activityId });
};
let activities = async () => {
  return await Activity.find({});
};
let activitiesByUser = async (userId: string) => {
  return await Activity.find({ userId: userId });
};
let addActivity = async (activity: any) => {
  const newActivity = await new Activity(activity);

  return newActivity.save();
};
let editActivity = async (activity: any) => {
  return await Activity.findOneAndUpdate(
    { activityId: activity.activityId },
    {
      $set: activity
    },
    { upsert: true }
  );
};
let deleteActivity = async (activity: any) => {
  return await Activity.findOneAndRemove(activity);
};

export {
  activity,
  activities,
  activitiesByUser,
  addActivity,
  editActivity,
  deleteActivity
};
