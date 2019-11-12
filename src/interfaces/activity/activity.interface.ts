import IDuty from 'interfaces/duty.interface';
import IUser from 'interfaces/user.interface';

export default interface IActivity {
  activityId: string;
  userId: string;
  user?: IUser;
  dutyId: string;
  duty?: IDuty;
  approvalStatus: string;
}
