import ISupervisionActivity from 'interfaces/activity/supervision-activity.interface';
import { Document } from 'mongoose';

export interface ISupervisionWorkloadPerActivity {
  activity: ISupervisionActivity;
  totalHoursPerActivity: number;
  percentageOfWorkFocusPerActivity: number;
  percentageOfAnnualHoursPerActivity: number;
  percentageOfTotalHoursPerActivity: number;
}

export default interface ISupervisionWorkload extends Document {
  userId: string;
  supervisionWorkloads: ISupervisionWorkloadPerActivity[];
  totalHoursPerUser: number;
  percentageOfWorkFocusPerUser: number;
  percentageOfAnnualHoursPerUser: number;
  percentageOfTotalHoursPerUser: number;
}
