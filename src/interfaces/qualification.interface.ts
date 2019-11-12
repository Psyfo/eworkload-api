import IDepartment from './department.interface';

export default interface IQualification {
  qualificationId: string;
  name: string;
  type: string;
  departmentId: string;
  department?: IDepartment;
}
