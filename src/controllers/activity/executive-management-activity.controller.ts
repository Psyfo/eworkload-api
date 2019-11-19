import IExecutiveManagementActivity from 'interfaces/activity/executive-management-activity.interface';

import parameters from '../../config/parameters.config';
import ExecutiveManagementActivity from '../../models/activity/executive-management-activity.model';
import WorkFocusController from '../work-focus.controller';
import WorkloadController from '../workload/workload.controller';

export default class ExecutiveManagementActivityController {
  public static async executiveManagementActivity(activityId: string) {
    return await ExecutiveManagementActivity.findOne({ activityId: activityId })
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
  public static async executiveManagementActivities() {
    return await ExecutiveManagementActivity.find({})
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
  public static async executiveManagementActivitiesByUser(userId: string) {
    return await ExecutiveManagementActivity.find({ userId: userId })
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
  public static async createExecutiveManagementActivity(
    activity: IExecutiveManagementActivity
  ) {
    const newActivity = new ExecutiveManagementActivity(activity);
    return await newActivity.save();
  }
  public static async updateExecutiveManagementActivity(
    activity: IExecutiveManagementActivity
  ) {
    return await ExecutiveManagementActivity.findOneAndUpdate(
      { activityId: activity.activityId },
      {
        $set: activity
      },
      { upsert: true }
    );
  }
  public static async deleteExecutiveManagementActivity(
    activity: IExecutiveManagementActivity
  ) {
    return await ExecutiveManagementActivity.findOneAndRemove(activity);
  }

  public static async executiveManagementGlobalTarrif() {
    return parameters.global_executive_management_tarrif;
  }
  public static async executiveManagementTotalHoursPerActivity(
    activityId: string
  ) {
    const activity: IExecutiveManagementActivity = (await this.executiveManagementActivity(
      activityId
    )) as IExecutiveManagementActivity;
    const serviceHours: number = await WorkFocusController.serviceHours(
      activity.userId
    );

    return serviceHours / 10;
  }
  public static async executiveManagementTotalHoursPerUser(userId: string) {
    const globalTarrif: number = await this.executiveManagementGlobalTarrif();
    const activities: IExecutiveManagementActivity[] = (await this.executiveManagementActivitiesByUser(
      userId
    )) as IExecutiveManagementActivity[];
    let activityHours: number = 0;
    for (let activity of activities) {
      activityHours += await this.executiveManagementTotalHoursPerActivity(
        activity.activityId
      );
    }
    return activityHours + globalTarrif;
  }
  public static async executiveManagementPercentageOfWorkFocusPerActivity(
    activityId: string
  ) {
    const activity: IExecutiveManagementActivity = (await this.executiveManagementActivity(
      activityId
    )) as IExecutiveManagementActivity;
    const serviceHours: number = await WorkFocusController.serviceHours(
      activity.userId
    );
    const activityHours: number = await this.executiveManagementTotalHoursPerActivity(
      activityId
    );
    return (activityHours / serviceHours) * 100;
  }
  public static async executiveManagementPercentageOfWorkFocusPerUser(
    userId: string
  ) {
    let globalTarrif: number = await this.executiveManagementGlobalTarrif();
    let serviceHours: number = await WorkFocusController.serviceHours(userId);
    let activityHours: number =
      (await this.executiveManagementTotalHoursPerUser(userId)) + globalTarrif;
    return (activityHours / serviceHours) * 100;
  }
  public static async executiveManagementPercentageOfAnnualHoursPerActivity(
    activityId: string
  ) {
    let activityHours: number = await this.executiveManagementTotalHoursPerActivity(
      activityId
    );
    let annualHours: number = parameters.annual_total_hours;
    return (activityHours / annualHours) * 100;
  }
  public static async executiveManagementPercentageOfTotalHoursPerActivity(
    activityId: string
  ) {
    const activity: IExecutiveManagementActivity = (await this.executiveManagementActivity(
      activityId
    )) as IExecutiveManagementActivity;
    const activityHours: number = await this.executiveManagementTotalHoursPerActivity(
      activityId
    );
    const totalHours: number = await WorkloadController.totalHoursPerUser(
      activity.userId
    );
    if (totalHours === undefined) {
      throw new Error('Total hours did not come through');
    }
    return (activityHours / totalHours) * 100;
  }
  public static async executiveManagementPercentageOfAnnualHoursPerUser(
    userId: string
  ) {
    const activityHours = await this.executiveManagementTotalHoursPerUser(
      userId
    );
    const annualHours = parameters.annual_total_hours;

    return (activityHours / annualHours) * 100;
  }
  public static async executiveManagementPercentageOfTotalHoursPerUser(
    userId: string
  ) {
    const activityHours = await this.executiveManagementTotalHoursPerUser(
      userId
    );
    const totalHours = await WorkloadController.totalHoursPerUser(userId);
    if (totalHours === undefined) {
      throw new Error('Total hours did not come through');
    }
    return (activityHours / totalHours) * 100;
  }
}
