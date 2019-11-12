import IDepartment from './department.interface';
import { Document } from 'mongoose';

export default interface IQualification extends Document {
  qualificationId: string;
  name: string;
  type: string;
  departmentId: string;
  department?: IDepartment;
}
