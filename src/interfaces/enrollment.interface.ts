import IQualification from './qualification.interface';

export default interface IEnrollment {
  enrollmentYear: string;
  qualificationId: string;
  qualification?: IQualification;
  firstYearEstimated: number;
  secondYearEstimated: number;
  thirdYearEstimated: number;
}
