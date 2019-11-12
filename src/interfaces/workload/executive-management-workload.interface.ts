import IExecutiveManagementActivity from 'interfaces/activity/executive-management-activity.interface';

interface IExecutiveManagementWorkloadPerActivity {
  activity: IExecutiveManagementActivity;
  totalHoursPerActivity: number;
  percentageOfWorkFocusPerActivity: number;
  percentageOfAnnualHoursPerActivity: number;
  percentageOfTotalHoursPerActivity: number;
}

export default interface IExecutiveManagementWorkload {
  userId: string;
  executiveManagementWorkloads: IExecutiveManagementWorkloadPerActivity[];
  globalTarrif: number;
  totalHoursPerUser: number;
  percentageOfWorkFocusPerUser: number;
  percentageOfAnnualHoursPerUser: number;
  percentageOfTotalHoursPerUser: number;
}
