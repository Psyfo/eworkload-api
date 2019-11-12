import IPublicServiceActivity from 'interfaces/activity/public-service-activity.interface';

interface IPublicServiceWorkloadPerActivity {
  activity: IPublicServiceActivity;
  totalHoursPerActivity: number;
  percentageOfWorkFocusPerActivity: number;
  percentageOfAnnualHoursPerActivity: number;
  percentageOfTotalHoursPerActivity: number;
}

export default interface IPublicServiceWorkload {
  userId: string;
  publicServiceWorkloads: IPublicServiceWorkloadPerActivity[];
  globalTarrif: number;
  totalHoursPerUser: number;
  percentageOfWorkFocusPerUser: number;
  percentageOfAnnualHoursPerUser: number;
  percentageOfTotalHoursPerUser: number;
}
