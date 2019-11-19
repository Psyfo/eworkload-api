import IPersonnelDevelopmentActivity from 'interfaces/activity/personnel-development-activity.interface';
import IPersonnelDevelopmentWorkload, {
  IPersonnelDevelopmentWorkloadPerActivity
} from 'interfaces/workload/personnel-development-workload.interface';

import PersonnelDevelopmentActivity from '../../models/activity/personnel-development-activity.model';
import PersonnelDevelopmentWorkload from '../../models/workload/personnel-development.model';
import PersonnelDevelopmentController from '../activity/personnel-development-activity.controller';

export default class PersonnelDevelopmentWorkloadController {
  public static async initializePDWorkload(userId: string) {
    const pdWorkload: IPersonnelDevelopmentWorkload = new PersonnelDevelopmentWorkload(
      {
        userId: userId
      }
    ) as IPersonnelDevelopmentWorkload;
    return await pdWorkload.save();
  }
  public static async personnelDevelopmentWorkload(userId: string) {
    return await PersonnelDevelopmentWorkload.findOne({
      userId: userId
    }).orFail();
  }
  public static async calculatePersonnelDevelopmentWorkload(userId: string) {
    const personnelDevelopmentWorkloads: IPersonnelDevelopmentWorkloadPerActivity[] = [];
    const activities: IPersonnelDevelopmentActivity[] = (await PersonnelDevelopmentActivity.find(
      {
        userId: userId
      }
    )) as IPersonnelDevelopmentActivity[];

    for (let activity of activities) {
      const personnelDevelopmentTotalHoursPerActivity: number = await PersonnelDevelopmentController.personnelDevelopmentTotalHoursPerActivity(
        activity.activityId
      );
      const percentageOfWorkFocusPerActivity: number = await PersonnelDevelopmentController.personnelDevelopmentPercentageOfWorkFocusPerActivity(
        activity.activityId
      );
      const percentageOfAnnualHoursPerActivity: number = await PersonnelDevelopmentController.personnelDevelopmentPercentageOfAnnualHoursPerActivity(
        activity.activityId
      );
      const percentageOfTotalHoursPerActivity: number = await PersonnelDevelopmentController.personnelDevelopmentPercentageOfTotalHoursPerActivity(
        activity.activityId
      );
      personnelDevelopmentWorkloads.push({
        activity: activity,
        totalHoursPerActivity: personnelDevelopmentTotalHoursPerActivity,
        percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
        percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
        percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
      });
    }
    const globalTarrif = await PersonnelDevelopmentController.personnelDevelopmentGlobalTarrif();
    const totalHoursPerUser = await PersonnelDevelopmentController.personnelDevelopmentTotalHoursPerUser(
      userId
    );
    const percentageOfWorkFocusPerUser = await PersonnelDevelopmentController.personnelDevelopmentPercentageOfWorkFocusPerUser(
      userId
    );
    const percentageOfAnnualHoursPerUser = await PersonnelDevelopmentController.personnelDevelopmentPercentageOfAnnualHoursPerUser(
      userId
    );
    const percentageOfTotalHoursPerUser = await PersonnelDevelopmentController.personnelDevelopmentPercentageOfTotalHoursPerUser(
      userId
    );

    const personnelDevelopmentWorkload: IPersonnelDevelopmentWorkload = new PersonnelDevelopmentWorkload(
      {
        userId: userId,
        personnelDevelopmentWorkloads: personnelDevelopmentWorkloads,
        globalTarrif: globalTarrif,
        totalHoursPerUser: totalHoursPerUser,
        percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
        percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
        percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
      }
    ) as IPersonnelDevelopmentWorkload;

    return await personnelDevelopmentWorkload.save();
  }
  public static async deletePersonnelDevelopmentWorkload(userId: string) {
    return await PersonnelDevelopmentWorkload.findOneAndRemove({
      userId: userId
    });
  }
}
