import IPublicServiceActivity from 'interfaces/activity/public-service-activity.interface';
import IPublicServiceWorkload, {
  IPublicServiceWorkloadPerActivity
} from 'interfaces/workload/public-service-workload.interface';

import PublicServiceActivity from '../../models/activity/public-service-activity.model';
import PublicServiceWorkload from '../../models/workload/public-service.model';
import PublicServiceController from '../activity/public-service-activity.controller';

export default class PublicServiceWorkloadController {
  public static async initializePSWorkload(userId: string) {
    const psWorkload: IPublicServiceWorkload = new PublicServiceWorkload({
      userId: userId
    }) as IPublicServiceWorkload;
    return await psWorkload.save();
  }
  public static async publicServiceWorkload(userId: string) {
    return await PublicServiceWorkload.findOne({
      userId: userId
    }).orFail();
  }
  public static async calculatePublicServiceWorkload(userId: string) {
    const publicServiceWorkloads: IPublicServiceWorkloadPerActivity[] = [];
    const activities: IPublicServiceActivity[] = (await PublicServiceActivity.find(
      {
        userId: userId
      }
    )) as IPublicServiceActivity[];

    for (let activity of activities) {
      const publicServiceTotalHoursPerActivity: number = await PublicServiceController.publicServiceTotalHoursPerActivity(
        activity.activityId
      );
      const percentageOfWorkFocusPerActivity: number = await PublicServiceController.publicServicePercentageOfWorkFocusPerActivity(
        activity.activityId
      );
      const percentageOfAnnualHoursPerActivity: number = await PublicServiceController.publicServicePercentageOfAnnualHoursPerActivity(
        activity.activityId
      );
      const percentageOfTotalHoursPerActivity: number = await PublicServiceController.publicServicePercentageOfTotalHoursPerActivity(
        activity.activityId
      );
      publicServiceWorkloads.push({
        activity: activity,
        totalHoursPerActivity: publicServiceTotalHoursPerActivity,
        percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
        percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
        percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
      });
    }
    const globalTarrif = await PublicServiceController.publicServiceGlobalTarrif();
    const totalHoursPerUser = await PublicServiceController.publicServiceTotalHoursPerUser(
      userId
    );
    const percentageOfWorkFocusPerUser = await PublicServiceController.publicServicePercentageOfWorkFocusPerUser(
      userId
    );
    const percentageOfAnnualHoursPerUser = await PublicServiceController.publicServicePercentageOfAnnualHoursPerUser(
      userId
    );
    const percentageOfTotalHoursPerUser = await PublicServiceController.publicServicePercentageOfTotalHoursPerUser(
      userId
    );

    const publicServiceWorkload: IPublicServiceWorkload = new PublicServiceWorkload(
      {
        userId: userId,
        publicServiceWorkloads: publicServiceWorkloads,
        globalTarrif: globalTarrif,
        totalHoursPerUser: totalHoursPerUser,
        percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
        percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
        percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
      }
    ) as IPublicServiceWorkload;

    return await publicServiceWorkload.save();
  }
  public static async deletePublicServiceWorkload(userId: string) {
    return await PublicServiceWorkload.findOneAndRemove({
      userId: userId
    });
  }
}
