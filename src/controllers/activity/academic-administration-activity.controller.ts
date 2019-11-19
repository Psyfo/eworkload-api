import IAcademicAdministrationActivity from 'interfaces/activity/academic-administration-activity.interface';

import parameters from '../../config/parameters.config';
import AcademicAdministrationActivity from '../../models/activity/academic-administration-activity.model';
import WorkFocusController from '../work-focus.controller';
import WorkloadController from '../workload/workload.controller';

export default class AcademicAdministrationActivityController {
  public static async academicAdministrationActivity(activityId: string) {
    return await AcademicAdministrationActivity.findOne({
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
      .populate('duty')
      .populate('qualification')
      .orFail();
  }
  public static async academicAdministrationActivities() {
    return await AcademicAdministrationActivity.find({})
      .populate({
        path: 'user',
        model: 'User',
        populate: [
          { path: 'disciplines', model: 'Discipline' },
          { path: 'position', model: 'Position' },
          { path: 'workFocus', model: 'WorkFocus' }
        ]
      })
      .populate('duty')
      .populate('qualification');
  }
  public static async academicAdministrationActivitiesByUser(userId: string) {
    return await AcademicAdministrationActivity.find({ userId: userId })
      .populate({
        path: 'user',
        model: 'User',
        populate: [
          { path: 'disciplines', model: 'Discipline' },
          { path: 'position', model: 'Position' },
          { path: 'workFocus', model: 'WorkFocus' }
        ]
      })
      .populate('duty')
      .populate('qualification');
  }
  public static async createAcademicAdministrationActivity(
    activity: IAcademicAdministrationActivity
  ) {
    const newActivity = new AcademicAdministrationActivity(activity);
    return await newActivity.save();
  }
  public static async updateAcademicAdministrationActivity(
    activity: IAcademicAdministrationActivity
  ) {
    return await AcademicAdministrationActivity.findOneAndUpdate(
      { activityId: activity.activityId },
      {
        $set: activity
      },
      { upsert: true }
    ).orFail();
  }
  public static async deleteAcademicAdministrationActivity(
    activity: IAcademicAdministrationActivity
  ) {
    return await AcademicAdministrationActivity.findOneAndRemove(
      activity
    ).orFail();
  }
  public static async academicAdministrationGlobalTarrif() {
    return parameters.global_academic_administration_tarrif;
  }
  public static async academicAdministrationBase(activityId: string) {
    const activity: IAcademicAdministrationActivity = (await this.academicAdministrationActivity(
      activityId
    )) as IAcademicAdministrationActivity;
    const serviceHours: number = await WorkFocusController.serviceHours(
      activity.userId
    );
    const activityHours: number = serviceHours * 0.25;
    return activityHours;
  }
  public static async academicAdministrationTotalHoursPerActivity(
    activityId: string
  ) {
    const activity: IAcademicAdministrationActivity = (await this.academicAdministrationActivity(
      activityId
    )) as IAcademicAdministrationActivity;
    if (!activity) {
      throw new Error('AA Activity is not defined');
    }
    const serviceHours: number = await WorkFocusController.serviceHours(
      activity.userId
    );
    return serviceHours / 10;
  }
  public static async academicAdministrationTotalHoursPerUser(userId: string) {
    let globalTarrif: number = await this.academicAdministrationGlobalTarrif();
    const activities: any[] = await this.academicAdministrationActivitiesByUser(
      userId
    );
    let activityHours = 0;
    for (let activity of activities) {
      activityHours += await this.academicAdministrationTotalHoursPerActivity(
        activity.activityId
      );
    }
    return activityHours + globalTarrif;
  }
  public static async academicAdministrationPercentageOfWorkFocusPerActivity(
    activityId: string
  ) {
    let activity: any = await this.academicAdministrationActivity(activityId);
    let serviceHours = await WorkFocusController.serviceHours(activity.userId);
    let activityHours = await this.academicAdministrationTotalHoursPerActivity(
      activityId
    );
    return (activityHours / serviceHours) * 100;
  }
  public static async academicAdministrationPercentageOfWorkFocusPerUser(
    userId: string
  ) {
    const serviceHours = await WorkFocusController.serviceHours(userId);
    const activityHours = await this.academicAdministrationTotalHoursPerUser(
      userId
    );
    return (activityHours / serviceHours) * 100;
  }
  public static async academicAdministrationPercentageOfAnnualHoursPerActivity(
    activityId: string
  ) {
    let activityHours = await this.academicAdministrationTotalHoursPerActivity(
      activityId
    );
    let annualHours = parameters.annual_total_hours;
    return (activityHours / annualHours) * 100;
  }
  public static async academicAdministrationPercentageOfAnnualHoursPerUser(
    userId: string
  ) {
    const activityHours = await this.academicAdministrationTotalHoursPerUser(
      userId
    );
    const annualHours = parameters.annual_total_hours;

    return (activityHours / annualHours) * 100;
  }
  public static async academicAdministrationPercentageOfTotalHoursPerActivity(
    activityId: string
  ) {
    const activity: IAcademicAdministrationActivity = (await this.academicAdministrationActivity(
      activityId
    )) as IAcademicAdministrationActivity;
    const activityHours = await this.academicAdministrationTotalHoursPerActivity(
      activityId
    );
    const totalHours = await WorkloadController.totalHoursPerUser(
      activity.userId
    );

    if (totalHours === undefined) {
      throw new Error('Total hours did not come through');
    }
    return (activityHours / totalHours) * 100;
  }
  public static async academicAdministrationPercentageOfTotalHoursPerUser(
    userId: string
  ) {
    let activityHours = await this.academicAdministrationTotalHoursPerUser(
      userId
    );
    let totalHours = await WorkloadController.totalHoursPerUser(userId);
    if (totalHours === undefined) {
      throw new Error('Total hours did not come through');
    }
    return (activityHours / totalHours) * 100;
  }
}
