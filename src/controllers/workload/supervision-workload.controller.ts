import ISupervisionActivity from 'interfaces/activity/supervision-activity.interface';
import ISupervisionWorkload, {
  ISupervisionWorkloadPerActivity
} from 'interfaces/workload/supervision-workload.interface';

import SupervisionActivity from '../../models/activity/supervision-activity.model';
import SupervisionWorkload from '../../models/workload/supervision.model';
import SupervisionController from '../activity/supervision-activity.controller';

export default class SupervisionWorkloadController {
  public static async initializeSWorkload(userId: string) {
    const sWorkload: ISupervisionWorkload = new SupervisionWorkload({
      userId: userId
    }) as ISupervisionWorkload;
    return await sWorkload.save();
  }
  public static async supervisionWorkload(userId: string) {
    return await SupervisionWorkload.findOne({
      userId: userId
    }).orFail();
  }
  public static async calculateSupervisionWorkload(userId: string) {
    const supervisionWorkloads: ISupervisionWorkloadPerActivity[] = [];
    const activities: ISupervisionActivity[] = (await SupervisionActivity.find({
      userId: userId
    })) as ISupervisionActivity[];

    for (let activity of activities) {
      const supervisionTotalHoursPerActivity: number = await SupervisionController.supervisionTotalHoursPerActivity(
        activity.activityId
      );
      const percentageOfWorkFocusPerActivity: number = await SupervisionController.supervisionPercentageOfWorkFocusPerActivity(
        activity.activityId
      );
      const percentageOfAnnualHoursPerActivity: number = await SupervisionController.supervisionPercentageOfAnnualHoursPerActivity(
        activity.activityId
      );
      const percentageOfTotalHoursPerActivity: number = await SupervisionController.supervisionPercentageOfTotalHoursPerActivity(
        activity.activityId
      );
      supervisionWorkloads.push({
        activity: activity,
        totalHoursPerActivity: supervisionTotalHoursPerActivity,
        percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
        percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
        percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
      });
    }
    const totalHoursPerUser = await SupervisionController.supervisionTotalHoursPerUser(
      userId
    );
    const percentageOfWorkFocusPerUser = await SupervisionController.supervisionPercentageOfWorkFocusPerUser(
      userId
    );
    const percentageOfAnnualHoursPerUser = await SupervisionController.supervisionPercentageOfAnnualHoursPerUser(
      userId
    );
    const percentageOfTotalHoursPerUser = await SupervisionController.supervisionPercentageOfTotalHoursPerUser(
      userId
    );

    const supervisionWorkload: ISupervisionWorkload = new SupervisionWorkload({
      userId: userId,
      supervisionWorkloads: supervisionWorkloads,
      totalHoursPerUser: totalHoursPerUser,
      percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
      percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
      percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
    }) as ISupervisionWorkload;

    return await supervisionWorkload.save();
  }
  public static async deleteSupervisionWorkload(userId: string) {
    return await SupervisionWorkload.findOneAndRemove({
      userId: userId
    });
  }
}
