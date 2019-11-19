import IActivity from 'interfaces/activity/activity.interface';

import Activity from '../../models/activity/activity.model';

export default class ActivityController {
  public static async activity(activityId: string) {
    return await Activity.findOne({ activityId: activityId });
  }
  public static async activities() {
    return await Activity.find({});
  }
  public static async activitiesByUser(userId: string) {
    return await Activity.find({ userId: userId });
  }
  public static async createActivity(activity: IActivity) {
    const newActivity = new Activity(activity);
    return await newActivity.save();
  }
  public static async updateActivity(activity: IActivity) {
    return await Activity.findOneAndUpdate(
      { activityId: activity.activityId },
      {
        $set: activity
      },
      { upsert: true }
    );
  }
  public static async deleteActivity(activity: IActivity) {
    return await Activity.findOneAndRemove(activity);
  }
}
