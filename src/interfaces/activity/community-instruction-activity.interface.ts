import { Document } from 'mongoose';

import IActivity from './activity.interface';

export default interface ICommunityInstructionActivity
  extends IActivity,
    Document {
  title: string;
  description: string;
  evidence?: string;
}
