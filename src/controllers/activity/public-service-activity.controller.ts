import IPublicServiceActivity from 'interfaces/activity/public-service-activity.interface';

import parameters from '../../config/parameters.config';
import PublicServiceActivity from '../../models/activity/public-service-activity.model';
import WorkFocusController from '../work-focus.controller';
import WorkloadController from '../workload/workload.controller';

export default class PublicServiceActivityController {
  public static async publicServiceActivity(activityId: string) {
    return await PublicServiceActivity.findOne({ activityId: activityId })
      .populate({
        path: 'user',
        model: 'User',
        populate: [
          { path: 'disciplines', model: 'Discipline' },
          { path: 'position', model: 'Position' },
          { path: 'workFocus', model: 'WorkFocus' }
        ]
      })
      .populate('duty');
  }
  public static async publicServiceActivities() {
    return await PublicServiceActivity.find({})
      .populate({
        path: 'user',
        model: 'User',
        populate: [
          { path: 'disciplines', model: 'Discipline' },
          { path: 'position', model: 'Position' },
          { path: 'workFocus', model: 'WorkFocus' }
        ]
      })
      .populate('duty');
  }
  public static async publicServiceActivitiesByUser(userId: string) {
    return await PublicServiceActivity.find({ userId: userId })
      .populate({
        path: 'user',
        model: 'User',
        populate: [
          { path: 'disciplines', model: 'Discipline' },
          { path: 'position', model: 'Position' },
          { path: 'workFocus', model: 'WorkFocus' }
        ]
      })
      .populate('duty');
  }
  public static async createPublicServiceActivity(
    activity: IPublicServiceActivity
  ) {
    return await activity.save();
  }
  public static async updatePublicServiceActivity(
    activity: IPublicServiceActivity
  ) {
    return await PublicServiceActivity.findOneAndUpdate(
      { activityId: activity.activityId },
      {
        $set: activity
      },
      { upsert: true }
    );
  }
  public static async deletePublicServiceActivity(
    activity: IPublicServiceActivity
  ) {
    return await PublicServiceActivity.findOneAndRemove(activity);
  }
  public static async publicServiceGlobalTarrif() {
    return parameters.global_public_service_tarrif;
  }
  public static async publicServiceTotalHoursPerActivity(activityId: string) {
    const activity: IPublicServiceActivity = (await this.publicServiceActivity(
      activityId
    )) as IPublicServiceActivity;
    const serviceHours = await WorkFocusController.serviceHours(
      activity.userId
    );
    return serviceHours / 10;
  }
  public static async publicServiceTotalHoursPerUser(userId: string) {
    const globalTarrif: number = await this.publicServiceGlobalTarrif();
    const activities: IPublicServiceActivity[] = (await this.publicServiceActivitiesByUser(
      userId
    )) as IPublicServiceActivity[];
    let activityHours: number = 0;
    for (let activity of activities) {
      activityHours += await this.publicServiceTotalHoursPerActivity(
        activity.activityId
      );
    }
    return activityHours + globalTarrif;
  }
  public static async publicServicePercentageOfWorkFocusPerActivity(
    activityId: string
  ) {
    const activity: IPublicServiceActivity = (await this.publicServiceActivity(
      activityId
    )) as IPublicServiceActivity;
    const serviceHours: number = await WorkFocusController.serviceHours(
      activity.userId
    );
    const activityHours: number = await this.publicServiceTotalHoursPerActivity(
      activityId
    );
    return (activityHours / serviceHours) * 100;
  }
  public static async publicServicePercentageOfWorkFocusPerUser(
    userId: string
  ) {
    const serviceHours: number = await WorkFocusController.serviceHours(userId);
    const activityHours: number = await this.publicServiceTotalHoursPerUser(
      userId
    );
    return (activityHours / serviceHours) * 100;
  }
  public static async publicServicePercentageOfAnnualHoursPerActivity(
    activityId: string
  ) {
    const activityHours: number = await this.publicServiceTotalHoursPerActivity(
      activityId
    );
    const annualHours: number = parameters.annual_total_hours;
    return (activityHours / annualHours) * 100;
  }
  public static async publicServicePercentageOfAnnualHoursPerUser(
    userId: string
  ) {
    const activityHours: number = await this.publicServiceTotalHoursPerUser(
      userId
    );
    const annualHours: number = parameters.annual_total_hours;
    return (activityHours / annualHours) * 100;
  }
  public static async publicServicePercentageOfTotalHoursPerActivity(
    activityId: string
  ) {
    const activity: IPublicServiceActivity = (await this.publicServiceActivity(
      activityId
    )) as IPublicServiceActivity;
    const activityHours: number = await this.publicServiceTotalHoursPerActivity(
      activityId
    );
    const totalHours: number = await WorkloadController.totalHoursPerUser(
      activity.userId
    );
    if (totalHours === undefined) {
      throw new Error('Total hours is undefined');
    }
    return (activityHours / totalHours) * 100;
  }
  public static async publicServicePercentageOfTotalHoursPerUser(
    userId: string
  ) {
    const activityHours: number = await this.publicServiceTotalHoursPerUser(
      userId
    );
    const totalHours: number = await WorkloadController.totalHoursPerUser(
      userId
    );
    if (totalHours === undefined) {
      throw new Error('Total hours is undefined');
    }
    return (activityHours / totalHours) * 100;
  }
}
