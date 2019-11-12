import IFaculty from './faculty.interface';
import IUser from './user.interface';

export default interface IDepartment {
  departmentId: string;
  name: string;
  facultyId: string;
  faculty?: IFaculty;
  hodId: string;
  hod?: IUser;
}
