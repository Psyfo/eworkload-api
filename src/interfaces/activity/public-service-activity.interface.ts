import IActivity from './activity.interface';

export default interface IPublicServiceActivity extends IActivity {
  title: string;
  description: string;
  evidence?: string;
}
