import IPersonnelDevelopmentActivity from 'interfaces/activity/personnel-development-activity.interface';

import parameters from '../../config/parameters.config';
import PersonnelDevelopmentActivity from '../../models/activity/personnel-development-activity.model';
import WorkFocusController from '../work-focus.controller';
import WorkloadController from '../workload/workload.controller';

export default class PersonnelDevelopmentActivityController {
  public static async personnelDevelopmentActivity(activityId: string) {
    return await PersonnelDevelopmentActivity.findOne({
      activityId: activityId
    })
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
  public static async personnelDevelopmentActivities() {
    return await PersonnelDevelopmentActivity.find({})
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
  public static async personnelDevelopmentActivitiesByUser(userId: string) {
    return await PersonnelDevelopmentActivity.find({ userId: userId })
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
  public static async createPersonnelDevelopmentActivity(
    activity: IPersonnelDevelopmentActivity
  ) {
    return await activity.save();
  }
  public static async updatePersonnelDevelopmentActivity(
    activity: IPersonnelDevelopmentActivity
  ) {
    return await PersonnelDevelopmentActivity.findOneAndUpdate(
      { activityId: activity.activityId },
      {
        $set: activity
      },
      { upsert: true }
    );
  }
  public static async deletePersonnelDevelopmentActivity(
    activity: IPersonnelDevelopmentActivity
  ) {
    return await PersonnelDevelopmentActivity.findOneAndRemove(activity);
  }
  public static async personnelDevelopmentGlobalTarrif() {
    return parameters.global_personnel_development_tarrif;
  }
  public static async personnelDevelopmentTotalHoursPerActivity(
    activityId: string
  ) {
    const activity: IPersonnelDevelopmentActivity = (await this.personnelDevelopmentActivity(
      activityId
    )) as IPersonnelDevelopmentActivity;
    const serviceHours: number = await WorkFocusController.serviceHours(
      activity.userId
    );

    return serviceHours / 10;
  }
  public static async personnelDevelopmentTotalHoursPerUser(userId: string) {
    const globalTarrif: number = await this.personnelDevelopmentGlobalTarrif();
    const activities: any[] = await this.personnelDevelopmentActivitiesByUser(
      userId
    );
    let activityHours: number = 0;
    for (let activity of activities) {
      activityHours += await this.personnelDevelopmentTotalHoursPerActivity(
        activity.activityId
      );
    }
    return activityHours + globalTarrif;
  }
  public static async personnelDevelopmentPercentageOfWorkFocusPerActivity(
    activityId: string
  ) {
    const activity: IPersonnelDevelopmentActivity = (await this.personnelDevelopmentActivity(
      activityId
    )) as IPersonnelDevelopmentActivity;
    const serviceHours: number = await WorkFocusController.serviceHours(
      activity.userId
    );
    const activityHours: number = await this.personnelDevelopmentTotalHoursPerActivity(
      activityId
    );
    return (activityHours / serviceHours) * 100;
  }
  public static async personnelDevelopmentPercentageOfWorkFocusPerUser(
    userId: string
  ) {
    const globalTarrif: number = await this.personnelDevelopmentGlobalTarrif();
    const serviceHours: number = await WorkFocusController.serviceHours(userId);
    const activityHours: number =
      (await this.personnelDevelopmentTotalHoursPerUser(userId)) + globalTarrif;

    return (activityHours / serviceHours) * 100;
  }
  public static async personnelDevelopmentPercentageOfAnnualHoursPerActivity(
    activityId: string
  ) {
    const activityHours: number = await this.personnelDevelopmentTotalHoursPerActivity(
      activityId
    );
    const annualHours: number = parameters.annual_total_hours;
    return (activityHours / annualHours) * 100;
  }
  public static async personnelDevelopmentPercentageOfAnnualHoursPerUser(
    userId: string
  ) {
    const activityHours: number = await this.personnelDevelopmentTotalHoursPerUser(
      userId
    );
    const annualHours: number = parameters.annual_total_hours;
    return (activityHours / annualHours) * 100;
  }
  public static async personnelDevelopmentPercentageOfTotalHoursPerActivity(
    activityId: string
  ) {
    const activity: any = await this.personnelDevelopmentActivity(activityId);
    const activityHours = await this.personnelDevelopmentTotalHoursPerActivity(
      activityId
    );
    const totalHours = await WorkloadController.totalHoursPerUser(
      activity.userId
    );
    if (totalHours === undefined) {
      throw new Error('Total hours is undefined');
    }
    return (activityHours / totalHours) * 100;
  }
  public static async personnelDevelopmentPercentageOfTotalHoursPerUser(
    userId: string
  ) {
    let activityHours = await this.personnelDevelopmentTotalHoursPerUser(
      userId
    );
    let totalHours = await WorkloadController.totalHoursPerUser(userId);
    if (totalHours === undefined) {
      throw new Error('Total hours is undefined');
    }
    return (activityHours / totalHours) * 100;
  }
}
