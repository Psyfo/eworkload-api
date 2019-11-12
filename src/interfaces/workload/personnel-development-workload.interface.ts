import IPersonnelDevelopmentActivity from 'interfaces/activity/personnel-development-activity.interface';

interface IPersonnelDevelopmentWorkloadPerActivity {
  activity: IPersonnelDevelopmentActivity;
  totalHoursPerActivity: number;
  percentageOfWorkFocusPerActivity: number;
  percentageOfAnnualHoursPerActivity: number;
  percentageOfTotalHoursPerActivity: number;
}

export default interface IPersonnelDevelopmentWorkload {
  userId: string;
  personnelDevelopmentWorkloads: IPersonnelDevelopmentWorkloadPerActivity[];
  globalTarrif: number;
  totalHoursPerUser: number;
  percentageOfWorkFocusPerUser: number;
  percentageOfAnnualHoursPerUser: number;
  percentageOfTotalHoursPerUser: number;
}
