import IStudent from 'interfaces/student.interface';

import IActivity from './activity.interface';
import { Document } from 'mongoose';

export default interface ISupervisionActivity extends IActivity, Document {
  supervisionRole: string;
  split: number;
  studentId: string;
  student?: IStudent;
  year: string;
}
