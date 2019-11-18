import IDuty from 'interfaces/duty.interface';
import IUser from 'interfaces/user.interface';
import { Document } from 'mongoose';

export default interface IActivity extends Document {
  activityId: string;
  userId: string;
  user?: IUser;
  dutyId: string;
  duty?: IDuty;
  approvalStatus: string;
}
