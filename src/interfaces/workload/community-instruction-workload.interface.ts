import ICommunityInstructionActivity from 'interfaces/activity/community-instruction-activity.interface';

interface ICommunityInstructionWorkloadPerActivity {
  activity: ICommunityInstructionActivity;
  totalHoursPerActivity: number;
  percentageOfWorkFocusPerActivity: number;
  percentageOfAnnualHoursPerActivity: number;
  percentageOfTotalHoursPerActivity: number;
}

export default interface ICommunityInstructionWorkload {
  userId: string;
  communityInstructionWorkloads: ICommunityInstructionWorkloadPerActivity[];
  globalTarrif: number;
  totalHoursPerUser: number;
  percentageOfWorkFocusPerUser: number;
  percentageOfAnnualHoursPerUser: number;
  percentageOfTotalHoursPerUser: number;
}
