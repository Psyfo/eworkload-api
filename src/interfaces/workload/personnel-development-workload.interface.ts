import IPersonnelDevelopmentActivity from 'interfaces/activity/personnel-development-activity.interface';
import { Document } from 'mongoose';

export interface IPersonnelDevelopmentWorkloadPerActivity {
  activity: IPersonnelDevelopmentActivity;
  totalHoursPerActivity: number;
  percentageOfWorkFocusPerActivity: number;
  percentageOfAnnualHoursPerActivity: number;
  percentageOfTotalHoursPerActivity: number;
}

export default interface IPersonnelDevelopmentWorkload extends Document {
  userId: string;
  personnelDevelopmentWorkloads: IPersonnelDevelopmentWorkloadPerActivity[];
  globalTarrif: number;
  totalHoursPerUser: number;
  percentageOfWorkFocusPerUser: number;
  percentageOfAnnualHoursPerUser: number;
  percentageOfTotalHoursPerUser: number;
}
