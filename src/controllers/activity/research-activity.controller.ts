import IResearchActivity from 'interfaces/activity/research-activity.interface';

import parameters from '../../config/parameters.config';
import ResearchActivity from '../../models/activity/research-activity.model';
import WorkFocusController from '../work-focus.controller';
import WorkloadController from '../workload/workload.controller';

export default class ResearchActivityController {
  public static async researchActivity(activityId: string) {
    return await ResearchActivity.findOne({ activityId: activityId })
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
  public static async researchActivities() {
    return await ResearchActivity.find({})
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
  public static async researchActivitiesByUser(userId: string) {
    return await ResearchActivity.find({ userId: userId })
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
  public static async createResearchActivity(activity: IResearchActivity) {
    const newActivity = new ResearchActivity(activity);
    return await newActivity.save();
  }
  public static async updateResearchActivity(activity: IResearchActivity) {
    return await ResearchActivity.findOneAndUpdate(
      { activityId: activity.activityId },
      {
        $set: activity
      },
      { upsert: true }
    );
  }
  public static async deleteResearchActivity(activity: IResearchActivity) {
    return await ResearchActivity.findOneAndRemove(activity);
  }
  public static async researchGlobalTarrif() {
    return parameters.global_research_tarrif;
  }
  public static async researchTotalHoursPerActivity(activityId: string) {
    const activity: any = await this.researchActivity(activityId);

    let totalHours: number = 60;
    if (activity.output === 'Conference Proceedings') {
      if (
        activity.conferenceActivities.find(
          (detail: string) => detail === 'Presented Paper'
        )
      ) {
        totalHours = 60;
      } else if (
        activity.conferenceActivities.find(
          (detail: string) => detail === 'Keynote address'
        )
      ) {
        totalHours = 120;
      }
    } else if (activity.output === 'Journal') {
      totalHours === 120;
    } else {
      totalHours = 60;
    }

    return totalHours;
  }
  public static async researchTotalHoursPerUser(userId: string) {
    const globalTarrif: number = await this.researchGlobalTarrif();
    const activities: IResearchActivity[] = (await this.researchActivitiesByUser(
      userId
    )) as IResearchActivity[];
    let activityHours: number = 0;
    for (let activity of activities) {
      activityHours += await this.researchTotalHoursPerActivity(
        activity.activityId
      );
    }
    return activityHours + globalTarrif;
  }
  public static async researchPercentageOfWorkFocusPerActivity(
    activityId: string
  ) {
    const activity: IResearchActivity = (await this.researchActivity(
      activityId
    )) as IResearchActivity;
    const serviceHours: number = await WorkFocusController.serviceHours(
      activity.userId
    );
    const activityHours: number = await this.researchTotalHoursPerActivity(
      activityId
    );
    return (activityHours / serviceHours) * 100;
  }
  public static async researchPercentageOfWorkFocusPerUser(userId: string) {
    const serviceHours: number = await WorkFocusController.serviceHours(userId);
    const activityHours: number = await this.researchTotalHoursPerUser(userId);
    return (activityHours / serviceHours) * 100;
  }
  public static async researchPercentageOfAnnualHoursPerActivity(
    activityId: string
  ) {
    const activityHours = await this.researchTotalHoursPerActivity(activityId);
    const annualHours = parameters.annual_total_hours;
    return (activityHours / annualHours) * 100;
  }
  public static async researchPercentageOfAnnualHoursPerUser(userId: string) {
    const activityHours: number = await this.researchTotalHoursPerUser(userId);
    const annualHours: number = parameters.annual_total_hours;
    return (activityHours / annualHours) * 100;
  }
  public static async researchPercentageOfTotalHoursPerActivity(
    activityId: string
  ) {
    const activity: IResearchActivity = (await this.researchActivity(
      activityId
    )) as IResearchActivity;
    const activityHours: number = await this.researchTotalHoursPerActivity(
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
  public static async researchPercentageOfTotalHoursPerUser(userId: string) {
    const activityHours: number = await this.researchTotalHoursPerUser(userId);
    const totalHours: number = await WorkloadController.totalHoursPerUser(
      userId
    );
    if (totalHours === undefined) {
      throw new Error('Total hours is undefined');
    }
    return (activityHours / totalHours) * 100;
  }
}
