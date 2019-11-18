import ISupervisionActivity from 'interfaces/activity/supervision-activity.interface';

import parameters from '../../config/parameters.config';
import SupervisionActivity from '../../models/activity/supervision-activity.model';
import WorkFocusController from '../work-focus.controller';
import WorkloadController from '../workload/workload.controller';

export default class SupervisionActivityController {
  public static async supervisionActivity(activityId: string) {
    return await SupervisionActivity.findOne({ activityId: activityId })
      .populate('user')
      .populate('duty')
      .populate('student');
  }
  public static async supervisionActivities() {
    return await SupervisionActivity.find({})
      .populate('user')
      .populate('duty')
      .populate('student');
  }
  public static async supervisionActivitiesByUser(userId: string) {
    return await SupervisionActivity.find({ userId: userId })
      .populate('user')
      .populate('duty')
      .populate('student');
  }
  public static async createSupervisionActivity(
    activity: ISupervisionActivity
  ) {
    return await activity.save();
  }
  public static async updateSupervisionActivity(
    activity: ISupervisionActivity
  ) {
    return await SupervisionActivity.findOneAndUpdate(
      { activityId: activity.activityId },
      {
        $set: activity
      },
      { upsert: true }
    );
  }
  public static async deleteSupervisionActivity(
    activity: ISupervisionActivity
  ) {
    return await SupervisionActivity.findOneAndRemove(activity);
  }
  public static async supervisionTotalHoursPerActivity(activityId: string) {
    const activity: ISupervisionActivity = (await this.supervisionActivity(
      activityId
    )) as ISupervisionActivity;

    let totalHours: number = 100;
    if (activity.split !== 100) {
      totalHours *= activity.split / 100;
    }
    return totalHours;
  }
  public static async supervisionTotalHoursPerUser(userId: string) {
    const activities: ISupervisionActivity[] = (await this.supervisionActivitiesByUser(
      userId
    )) as ISupervisionActivity[];
    let activityHours: number = 0;
    for (let activity of activities) {
      activityHours += await this.supervisionTotalHoursPerActivity(
        activity.activityId
      );
    }
    return activityHours;
  }
  public static async supervisionPercentageOfWorkFocusPerActivity(
    activityId: string
  ) {
    let activity: ISupervisionActivity = (await this.supervisionActivity(
      activityId
    )) as ISupervisionActivity;
    let serviceHours: number = await WorkFocusController.serviceHours(
      activity.userId
    );
    let activityHours: number = await this.supervisionTotalHoursPerActivity(
      activityId
    );
    return (activityHours / serviceHours) * 100;
  }
  public static async supervisionPercentageOfWorkFocusPerUser(userId: string) {
    let teachingHours: number = await WorkFocusController.teachingHours(userId);
    let activityHours: number = await this.supervisionTotalHoursPerUser(userId);
    return (activityHours / teachingHours) * 100;
  }
  public static async supervisionPercentageOfAnnualHoursPerActivity(
    activityId: string
  ) {
    let activityHours: number = await this.supervisionTotalHoursPerActivity(
      activityId
    );
    let annualHours: number = parameters.annual_total_hours;
    return (activityHours / annualHours) * 100;
  }
  public static async supervisionPercentageOfAnnualHoursPerUser(
    userId: string
  ) {
    let activityHours: number = await this.supervisionTotalHoursPerUser(userId);
    let annualHours: number = parameters.annual_total_hours;
    return (activityHours / annualHours) * 100;
  }
  public static async supervisionPercentageOfTotalHoursPerActivity(
    activityId: string
  ) {
    let activity: ISupervisionActivity = (await this.supervisionActivity(
      activityId
    )) as ISupervisionActivity;
    let activityHours: number = 0;
    activityHours = await this.supervisionTotalHoursPerActivity(activityId);
    let totalHours: number = await WorkloadController.totalHoursPerUser(
      activity.userId
    );
    if (totalHours === undefined) {
      throw new Error('Total hours is undefined');
    }
    return (activityHours / totalHours) * 100;
  }
  public static async supervisionPercentageOfTotalHoursPerUser(userId: string) {
    let activityHours: number = await this.supervisionTotalHoursPerUser(userId);
    let totalHours: number = await WorkloadController.totalHoursPerUser(userId);
    if (totalHours === undefined) {
      throw new Error('Total hours is undefined');
    }
    return (activityHours / totalHours) * 100;
  }
}
