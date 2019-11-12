import ISupervisionActivity from 'interfaces/activity/supervision-activity.interface';

interface ISupervisionWorkloadPerActivity {
  activity: ISupervisionActivity;
  totalHoursPerActivity: number;
  percentageOfWorkFocusPerActivity: number;
  percentageOfAnnualHoursPerActivity: number;
  percentageOfTotalHoursPerActivity: number;
}

export default interface ISupervisionWorkload {
  userId: string;
  supervisionWorkloads: ISupervisionWorkloadPerActivity[];
  globalTarrif: number;
  totalHoursPerUser: number;
  percentageOfWorkFocusPerUser: number;
  percentageOfAnnualHoursPerUser: number;
  percentageOfTotalHoursPerUser: number;
}
