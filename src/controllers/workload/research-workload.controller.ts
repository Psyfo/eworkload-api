import IResearchActivity from 'interfaces/activity/research-activity.interface';
import IResearchWorkload, {
  IResearchWorkloadPerActivity
} from 'interfaces/workload/research-workload.interface';

import ResearchActivity from '../../models/activity/research-activity.model';
import ResearchWorkload from '../../models/workload/research.model';
import ResearchController from '../activity/research-activity.controller';

export default class ResearchWorkloadController {
  public static async initializeRWorkload(userId: string) {
    const rWorkload: IResearchWorkload = new ResearchWorkload({
      userId: userId
    }) as IResearchWorkload;
    return await rWorkload.save();
  }
  public static async researchWorkload(userId: string) {
    return await ResearchWorkload.findOne({
      userId: userId
    }).orFail();
  }
  public static async calculateResearchWorkload(userId: string) {
    const researchWorkloads: IResearchWorkloadPerActivity[] = [];
    const activities: IResearchActivity[] = (await ResearchActivity.find({
      userId: userId
    })) as IResearchActivity[];

    for (let activity of activities) {
      const researchTotalHoursPerActivity: number = await ResearchController.researchTotalHoursPerActivity(
        activity.activityId
      );
      const percentageOfWorkFocusPerActivity: number = await ResearchController.researchPercentageOfWorkFocusPerActivity(
        activity.activityId
      );
      const percentageOfAnnualHoursPerActivity: number = await ResearchController.researchPercentageOfAnnualHoursPerActivity(
        activity.activityId
      );
      const percentageOfTotalHoursPerActivity: number = await ResearchController.researchPercentageOfTotalHoursPerActivity(
        activity.activityId
      );
      researchWorkloads.push({
        activity: activity,
        totalHoursPerActivity: researchTotalHoursPerActivity,
        percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
        percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
        percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
      });
    }
    const globalTarrif = await ResearchController.researchGlobalTarrif();
    const totalHoursPerUser = await ResearchController.researchTotalHoursPerUser(
      userId
    );
    const percentageOfWorkFocusPerUser = await ResearchController.researchPercentageOfWorkFocusPerUser(
      userId
    );
    const percentageOfAnnualHoursPerUser = await ResearchController.researchPercentageOfAnnualHoursPerUser(
      userId
    );
    const percentageOfTotalHoursPerUser = await ResearchController.researchPercentageOfTotalHoursPerUser(
      userId
    );

    const researchWorkload: IResearchWorkload = new ResearchWorkload({
      userId: userId,
      researchWorkloads: researchWorkloads,
      globalTarrif: globalTarrif,
      totalHoursPerUser: totalHoursPerUser,
      percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
      percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
      percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
    }) as IResearchWorkload;

    return await researchWorkload.save();
  }
  public static async deleteResearchWorkload(userId: string) {
    return await ResearchWorkload.findOneAndRemove({
      userId: userId
    });
  }
}
