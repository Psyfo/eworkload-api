import IFaculty from './faculty.interface';
import IUser from './user.interface';
import { Document } from 'mongoose';

export default interface IDepartment extends Document {
  departmentId: string;
  name: string;
  facultyId: string;
  faculty?: IFaculty;
  hodId: string;
  hod?: IUser;
}
