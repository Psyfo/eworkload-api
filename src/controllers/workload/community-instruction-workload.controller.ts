import ICommunityInstructionActivity from 'interfaces/activity/community-instruction-activity.interface';
import ICommunityInstructionWorkload, {
  ICommunityInstructionWorkloadPerActivity
} from 'interfaces/workload/community-instruction-workload.interface';

import CommunityInstructionActivity from '../../models/activity/community-instruction-activity.model';
import CommunityInstructionWorkload from '../../models/workload/community-instruction.model';
import CommunityInstructionController from '../activity/community-instruction-activity.controller';

export default class CommunityInstructionWorkloadController {
  public static async initializeCIWorkload(userId: string) {
    const ciWorkload: ICommunityInstructionWorkload = new CommunityInstructionWorkload(
      {
        userId: userId
      }
    ) as ICommunityInstructionWorkload;
    return await ciWorkload.save();
  }
  public static async communityInstructionWorkload(userId: string) {
    return await CommunityInstructionWorkload.findOne({
      userId: userId
    }).orFail();
  }
  public static async calculateCommunityInstructionWorkload(userId: string) {
    let communityInstructionWorkloads: ICommunityInstructionWorkloadPerActivity[] = [];
    const activities: ICommunityInstructionActivity[] = (await CommunityInstructionActivity.find(
      {
        userId: userId
      }
    )) as ICommunityInstructionActivity[];

    for (let activity of activities) {
      let communityInstructionTotalHoursPerActivity: number = await CommunityInstructionController.communityInstructionTotalHoursPerActivity(
        activity.activityId
      );
      let percentageOfWorkFocusPerActivity: number = await CommunityInstructionController.communityInstructionPercentageOfWorkFocusPerActivity(
        activity.activityId
      );
      let percentageOfAnnualHoursPerActivity: number = await CommunityInstructionController.communityInstructionPercentageOfAnnualHoursPerActivity(
        activity.activityId
      );
      let percentageOfTotalHoursPerActivity: number = await CommunityInstructionController.communityInstructionPercentageOfTotalHoursPerActivity(
        activity.activityId
      );
      communityInstructionWorkloads.push({
        activity: activity,
        totalHoursPerActivity: communityInstructionTotalHoursPerActivity,
        percentageOfWorkFocusPerActivity: percentageOfWorkFocusPerActivity,
        percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
        percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
      });
    }
    const globalTarrif: number = await CommunityInstructionController.communityInstructionGlobalTarrif();
    const totalHoursPerUser: number = await CommunityInstructionController.communityInstructionTotalHoursPerUser(
      userId
    );
    const percentageOfWorkFocusPerUser: number = await CommunityInstructionController.communityInstructionPercentageOfWorkFocusPerUser(
      userId
    );
    const percentageOfAnnualHoursPerUser: number = await CommunityInstructionController.communityInstructionPercentageOfAnnualHoursPerUser(
      userId
    );
    const percentageOfTotalHoursPerUser: number = await CommunityInstructionController.communityInstructionPercentageOfTotalHoursPerUser(
      userId
    );

    const communityInstructionWorkload: ICommunityInstructionWorkload = {
      userId: userId,
      communityInstructionWorkloads: communityInstructionWorkloads,
      globalTarrif: globalTarrif,
      totalHoursPerUser: totalHoursPerUser,
      percentageOfWorkFocusPerUser: percentageOfWorkFocusPerUser,
      percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
      percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
    } as ICommunityInstructionWorkload;

    return await communityInstructionWorkload.save();
  }
  public static async deleteCommunityInstructionWorkload(userId: string) {
    return await CommunityInstructionWorkload.findOneAndRemove({
      userId: userId
    });
  }
}
