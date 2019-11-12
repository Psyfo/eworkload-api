import IQualification from 'interfaces/qualification.interface';
import { Document } from 'mongoose';

import IActivity from './activity.interface';

export default interface IAcademicAdministrationActivity
  extends IActivity,
    Document {
  title: string;
  qualificationId: string;
  qualification?: IQualification;
  description: string;
  evidence?: string;
}
