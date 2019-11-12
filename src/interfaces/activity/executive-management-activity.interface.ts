import { Document } from 'mongoose';

import IActivity from './activity.interface';

export default interface IExecutiveManagementActivity
  extends IActivity,
    Document {
  title: string;
  description: string;
  evidence?: string;
}
