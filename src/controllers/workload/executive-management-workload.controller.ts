import IExecutiveManagementActivity from 'interfaces/activity/executive-management-activity.interface';
import IExecutiveManagementWorkload, {
  IExecutiveManagementWorkloadPerActivity
} from 'interfaces/workload/executive-management-workload.interface';

import ExecutiveManagementActivity from '../../models/activity/executive-management-activity.model';
import ExecutiveManagementWorkload from '../../models/workload/executive-management.model';
import ExecutiveManagementController from '../activity/executive-management-activity.controller';

export default class ExecutiveManagementWorkloadController {
  public static async initializeEMWorkload(userId: string) {
    const emWorkload: IExecutiveManagementWorkload = new ExecutiveManagementWorkload({
      userId: userId
    }) as IExecutiveManagementWorkload;
    return await emWorkload.save();
  }
  public static async executiveManagementWorkload(userId: string) {
    return await ExecutiveManagementWorkload.findOne({
      userId: userId
    });
  }
  public static async calculateExecutiveManagementWorkload(userId: string) {
    const executiveManagementWorkloads: IExecutiveManagementWorkloadPerActivity[] = [];
    const activities: IExecutiveManagementActivity[] = (await ExecutiveManagementActivity.find({
      userId: userId
    })) as IExecutiveManagementActivity[];

    for (let activity of activities) {
      const executiveManagementTotalHoursPerActivity: number = await ExecutiveManagementController.executiveManagementTotalHoursPerActivity(
        activity.activityId
      );
      const percentageOfWorkFocusPerActivity: number = await ExecutiveManagementController.executiveManagementPercentageOfWorkFocusPerActivity(
        activity.activityId
      );
      const percentageOfAnnualHoursPerActivity: number = await ExecutiveManagementController.executiveManagementPercentageOfAnnualHoursPerActivity(
        activity.activityId
      );
      const percentageOfTotalHoursPerActivity: number = await ExecutiveManagementController.executiveManagementPercentageOfTotalHoursPerActivity(
        activity.activityId
      );
      executiveManagementWorkloads.push({
        activity: activity,
        totalHoursPerActivity: executiveManagementTotalHoursPerActivity,
        percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
        percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
        percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
      });
    }
    const globalTarrif = await ExecutiveManagementController.executiveManagementGlobalTarrif();
    const totalHoursPerUser = await ExecutiveManagementController.executiveManagementTotalHoursPerUser(userId);
    const percentageOfWorkFocusPerUser = await ExecutiveManagementController.executiveManagementPercentageOfWorkFocusPerUser(
      userId
    );
    const percentageOfAnnualHoursPerUser = await ExecutiveManagementController.executiveManagementPercentageOfAnnualHoursPerUser(
      userId
    );
    const percentageOfTotalHoursPerUser = await ExecutiveManagementController.executiveManagementPercentageOfTotalHoursPerUser(
      userId
    );

    const executiveManagementWorkload: IExecutiveManagementWorkload = new ExecutiveManagementWorkload({
      userId: userId,
      executiveManagementWorkloads: executiveManagementWorkloads,
      globalTarrif: globalTarrif,
      totalHoursPerUser: totalHoursPerUser,
      percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
      percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
      percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
    }) as IExecutiveManagementWorkload;

    return await executiveManagementWorkload.save();
  }
  public static async deleteExecutiveManagementWorkload(userId: string) {
    return await ExecutiveManagementWorkload.findOneAndRemove({
      userId: userId
    });
  }
}
