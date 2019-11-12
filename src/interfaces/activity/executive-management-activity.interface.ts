import IActivity from './activity.interface';

export default interface IExecutiveManagementActivity extends IActivity {
  title: string;
  description: string;
  evidence?: string;
}
