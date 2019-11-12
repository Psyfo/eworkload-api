import ISupervisionActivity from 'interfaces/activity/supervision-activity.interface';
import { Document } from 'mongoose';

interface ISupervisionWorkloadPerActivity {
  activity: ISupervisionActivity;
  totalHoursPerActivity: number;
  percentageOfWorkFocusPerActivity: number;
  percentageOfAnnualHoursPerActivity: number;
  percentageOfTotalHoursPerActivity: number;
}

export default interface ISupervisionWorkload extends Document {
  userId: string;
  supervisionWorkloads: ISupervisionWorkloadPerActivity[];
  globalTarrif: number;
  totalHoursPerUser: number;
  percentageOfWorkFocusPerUser: number;
  percentageOfAnnualHoursPerUser: number;
  percentageOfTotalHoursPerUser: number;
}
