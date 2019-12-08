import { Document } from 'mongoose';

import IActivity from './activity.interface';

export default interface IPersonnelDevelopmentActivity extends IActivity, Document {
  title: string;
  date: Date;
  duration: string;
  evidence?: string;
}
