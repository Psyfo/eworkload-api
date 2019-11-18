import IPublicServiceActivity from 'interfaces/activity/public-service-activity.interface';
import { Document } from 'mongoose';

export interface IPublicServiceWorkloadPerActivity {
  activity: IPublicServiceActivity;
  totalHoursPerActivity: number;
  percentageOfWorkFocusPerActivity: number;
  percentageOfAnnualHoursPerActivity: number;
  percentageOfTotalHoursPerActivity: number;
}

export default interface IPublicServiceWorkload extends Document {
  userId: string;
  publicServiceWorkloads: IPublicServiceWorkloadPerActivity[];
  globalTarrif: number;
  totalHoursPerUser: number;
  percentageOfWorkFocusPerUser: number;
  percentageOfAnnualHoursPerUser: number;
  percentageOfTotalHoursPerUser: number;
}
