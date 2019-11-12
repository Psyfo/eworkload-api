import IActivity from './activity.interface';

export default interface ICommunityInstructionActivity extends IActivity {
  title: string;
  description: string;
  evidence?: string;
}
