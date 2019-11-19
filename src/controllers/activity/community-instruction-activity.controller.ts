import ICommunityInstructionActivity from 'interfaces/activity/community-instruction-activity.interface';

import parameters from '../../config/parameters.config';
import CommunityInstructionActivity from '../../models/activity/community-instruction-activity.model';
import WorkFocusController from '../work-focus.controller';
import WorkloadController from '../workload/workload.controller';

export default class CommunityInstructionActivityController {
  public static async communityInstructionActivity(activityId: string) {
    return await CommunityInstructionActivity.findOne({
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
  public static async communityInstructionActivities() {
    return await CommunityInstructionActivity.find({})
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
  public static async communityInstructionActivitiesByUser(userId: string) {
    return await CommunityInstructionActivity.find({ userId: userId })
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
  public static async createCommunityInstructionActivity(
    activity: ICommunityInstructionActivity
  ) {
    const newActivity = new CommunityInstructionActivity(activity);
    return await newActivity.save();
  }
  public static async updateCommunityInstructionActivity(
    activity: ICommunityInstructionActivity
  ) {
    return await CommunityInstructionActivity.findOneAndUpdate(
      { activityId: activity.activityId },
      {
        $set: activity
      },
      { upsert: true }
    );
  }
  public static async deleteCommunityInstructionActivity(
    activity: ICommunityInstructionActivity
  ) {
    return await CommunityInstructionActivity.findOneAndRemove(activity);
  }
  public static async communityInstructionGlobalTarrif() {
    return parameters.global_community_instruction_tarrif;
  }
  public static async communityInstructionTotalHoursPerActivity(
    activityId: string
  ) {
    const activity: ICommunityInstructionActivity = (await this.communityInstructionActivity(
      activityId
    )) as ICommunityInstructionActivity;
    const serviceHours: number = await WorkFocusController.serviceHours(
      activity.userId
    );

    return serviceHours / 10;
  }
  public static async communityInstructionTotalHoursPerUser(userId: string) {
    const globalTarrif: number = await this.communityInstructionGlobalTarrif();
    const activities: ICommunityInstructionActivity[] = (await this.communityInstructionActivitiesByUser(
      userId
    )) as ICommunityInstructionActivity[];
    let activityHours: number = 0;
    for (let activity of activities) {
      activityHours += await this.communityInstructionTotalHoursPerActivity(
        activity.activityId
      );
    }
    return activityHours + globalTarrif;
  }
  public static async communityInstructionPercentageOfWorkFocusPerActivity(
    activityId: string
  ) {
    const activity: ICommunityInstructionActivity = (await this.communityInstructionActivity(
      activityId
    )) as ICommunityInstructionActivity;
    const serviceHours: number = await WorkFocusController.serviceHours(
      activity.userId
    );
    const activityHours: number = await this.communityInstructionTotalHoursPerActivity(
      activityId
    );
    return (activityHours / serviceHours) * 100;
  }
  public static async communityInstructionPercentageOfWorkFocusPerUser(
    userId: string
  ) {
    const globalTarrif: number = await this.communityInstructionGlobalTarrif();
    const serviceHours: number = await WorkFocusController.serviceHours(userId);
    const activityHours: number =
      (await this.communityInstructionTotalHoursPerUser(userId)) + globalTarrif;

    return (activityHours / serviceHours) * 100;
  }
  public static async communityInstructionPercentageOfAnnualHoursPerActivity(
    activityId: string
  ) {
    const activityHours: number = await this.communityInstructionTotalHoursPerActivity(
      activityId
    );
    const annualHours: number = parameters.annual_total_hours;
    return (activityHours / annualHours) * 100;
  }
  public static async communityInstructionPercentageOfTotalHoursPerActivity(
    activityId: string
  ) {
    const activity: ICommunityInstructionActivity = (await this.communityInstructionActivity(
      activityId
    )) as ICommunityInstructionActivity;
    const activityHours: number = await this.communityInstructionTotalHoursPerActivity(
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
  public static async communityInstructionPercentageOfAnnualHoursPerUser(
    userId: string
  ) {
    const activityHours: number = await this.communityInstructionTotalHoursPerUser(
      userId
    );
    const annualHours: number = parameters.annual_total_hours;

    return (activityHours / annualHours) * 100;
  }
  public static async communityInstructionPercentageOfTotalHoursPerUser(
    userId: string
  ) {
    const activityHours: number = await this.communityInstructionTotalHoursPerUser(
      userId
    );
    const totalHours: number = await WorkloadController.totalHoursPerUser(
      userId
    );
    if (totalHours === undefined) {
      throw new Error('Total hours did not come through');
    }
    return (activityHours / totalHours) * 100;
  }
}
