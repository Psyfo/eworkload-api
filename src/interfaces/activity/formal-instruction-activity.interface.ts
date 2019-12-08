import IGroup from 'interfaces/group.interface';
import { Document } from 'mongoose';

import IActivity from './activity.interface';

export default interface IFormalInstructionActivity extends IActivity, Document {
  groupId: string;
  group: IGroup;
  isCoordinator: boolean;
}
