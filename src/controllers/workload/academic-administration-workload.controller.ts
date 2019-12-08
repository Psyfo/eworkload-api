import IAcademicAdministrationActivity from 'interfaces/activity/academic-administration-activity.interface';
import IAcademicAdministrationWorkload, {
  IAcademicAdministrationWorkloadPerActivity
} from 'interfaces/workload/academic-administration-workload.interface';

import AcademicAdministrationWorkload from '../../models/workload/academic-administration.model';
import AcademicAdministrationController from '../activity/academic-administration-activity.controller';

export default class AcademicAdministrationWorkloadController {
  public static async initializeAAWorkload(userId: string) {
    const workload: IAcademicAdministrationWorkload = new AcademicAdministrationWorkload({
      userId: userId
    }) as IAcademicAdministrationWorkload;
    return await workload.save();
  }
  public static async academicAdministrationWorkload(userId: string) {
    return await AcademicAdministrationWorkload.findOne({
      userId: userId
    });
  }
  public static async calculateAcademicAdministrationWorkload(userId: string) {
    let academicAdministrationWorkloads: IAcademicAdministrationWorkloadPerActivity[] = [];
    let activities: IAcademicAdministrationActivity[] = (await AcademicAdministrationController.academicAdministrationActivitiesByUser(
      userId
    )) as IAcademicAdministrationActivity[];

    // Iterate through activities to calculate per-activity workloads
    if (activities) {
      for (let activity of activities) {
        const academicAdministrationTotalHoursPerActivity: number = await AcademicAdministrationController.academicAdministrationTotalHoursPerActivity(
          activity.activityId
        );
        const percentageOfWorkFocusPerActivity: number = await AcademicAdministrationController.academicAdministrationPercentageOfWorkFocusPerActivity(
          activity.activityId
        );
        const percentageOfAnnualHoursPerActivity: number = await AcademicAdministrationController.academicAdministrationPercentageOfAnnualHoursPerActivity(
          activity.activityId
        );
        const percentageOfTotalHoursPerActivity: number = await AcademicAdministrationController.academicAdministrationPercentageOfTotalHoursPerActivity(
          activity.activityId
        );

        await academicAdministrationWorkloads.push({
          activity: activity,
          totalHoursPerActivity: academicAdministrationTotalHoursPerActivity,
          percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
          percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
          percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
        });
      }
    }
    const globalTarrif: number = await AcademicAdministrationController.academicAdministrationGlobalTarrif();
    const totalHoursPerUser: number = await AcademicAdministrationController.academicAdministrationTotalHoursPerUser(
      userId
    );
    const percentageOfWorkFocusPerUser: number = await AcademicAdministrationController.academicAdministrationPercentageOfWorkFocusPerUser(
      userId
    );
    const percentageOfAnnualHoursPerUser: number = await AcademicAdministrationController.academicAdministrationPercentageOfAnnualHoursPerUser(
      userId
    );
    const percentageOfTotalHoursPerUser: number = await AcademicAdministrationController.academicAdministrationPercentageOfTotalHoursPerUser(
      userId
    );

    const academicAdministrationWorkload: IAcademicAdministrationWorkload = new AcademicAdministrationWorkload({
      userId: userId,
      academicAdministrationWorkloads: academicAdministrationWorkloads,
      globalTarrif: globalTarrif,
      totalHoursPerUser: totalHoursPerUser,
      percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
      percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
      percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
    }) as IAcademicAdministrationWorkload;

    return await academicAdministrationWorkload.save();
  }
  public static async deleteAcademicAdministrationWorkload(userId: string) {
    return await AcademicAdministrationWorkload.findOneAndRemove({
      userId: userId
    });
  }
}
