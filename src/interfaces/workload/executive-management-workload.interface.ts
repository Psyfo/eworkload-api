import IExecutiveManagementActivity from 'interfaces/activity/executive-management-activity.interface';
import { Document } from 'mongoose';

export interface IExecutiveManagementWorkloadPerActivity {
  activity: IExecutiveManagementActivity;
  totalHoursPerActivity: number;
  percentageOfWorkFocusPerActivity: number;
  percentageOfAnnualHoursPerActivity: number;
  percentageOfTotalHoursPerActivity: number;
}

export default interface IExecutiveManagementWorkload extends Document {
  userId: string;
  executiveManagementWorkloads: IExecutiveManagementWorkloadPerActivity[];
  globalTarrif: number;
  totalHoursPerUser: number;
  percentageOfWorkFocusPerUser: number;
  percentageOfAnnualHoursPerUser: number;
  percentageOfTotalHoursPerUser: number;
}
