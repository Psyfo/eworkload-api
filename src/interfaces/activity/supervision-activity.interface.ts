import IStudent from 'interfaces/student.interface';

import IActivity from './activity.interface';

export default interface ISupervisionActivity extends IActivity {
  supervisionRole: string;
  split: number;
  studentId: string;
  student?: IStudent;
  year: string;
}
