import IDepartment from './department.interface';
import IDiscipline from './discipline.interface';
import IPosition from './position.interface';
import IWorkFocus from './work-focus.interface';

export default interface IUser {
  userId: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  disciplineIds?: string[];
  disciplines?: IDiscipline[];
  positionId: string;
  position?: IPosition;
  departmentId: string;
  department?: IDepartment;
  gender?: string;
  nationality?: string;
  workFocusName: string;
  workFocus?: IWorkFocus;
}
