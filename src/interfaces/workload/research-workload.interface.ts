import IResearchActivity from 'interfaces/activity/research-activity.interface';
import { Document } from 'mongoose';

export interface IResearchWorkloadPerActivity {
  activity: IResearchActivity;
  totalHoursPerActivity: number;
  percentageOfWorkFocusPerActivity: number;
  percentageOfAnnualHoursPerActivity: number;
  percentageOfTotalHoursPerActivity: number;
}

export default interface IResearchWorkload extends Document {
  userId: string;
  researchWorkloads: IResearchWorkloadPerActivity[];
  globalTarrif: number;
  totalHoursPerUser: number;
  percentageOfWorkFocusPerUser: number;
  percentageOfAnnualHoursPerUser: number;
  percentageOfTotalHoursPerUser: number;
}
