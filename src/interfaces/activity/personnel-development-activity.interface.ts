import IActivity from './activity.interface';

export default interface IPersonnelDevelopmentActivity extends IActivity {
  title: string;
  date: Date;
  duration: string;
  evidence?: string;
}
