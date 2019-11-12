import { Document } from 'mongoose';

import IActivity from './activity.interface';

export default interface IResearchActivity extends IActivity, Document {
  output: string;
  title: string;
  conferenceActivities?: string[];
  authors?: string[];
  url?: string;
  dates?: Date[];
  details?: string;
  evidence?: string;
}
