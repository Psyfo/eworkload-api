import IActivity from './activity.interface';
import IQualification from 'interfaces/qualification.interface';

export default interface IAcademicAdministrationActivity extends IActivity {
  title: string;
  qualificationId: string;
  qualification?: IQualification;
  description: string;
  evidence?: string;
}
