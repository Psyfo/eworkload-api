import { Document } from 'mongoose';

import IModule from './module.interface';
import IUser from './user.interface';

export default interface IGroup extends Document {
  id: string;
  groupId: string;
  moduleId: string;
  module: IModule;
  studentsEnrolled: number;
  modularity: number;
}
