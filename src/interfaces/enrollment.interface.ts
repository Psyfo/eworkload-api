import IQualification from './qualification.interface';
import { Document } from 'mongoose';

export default interface IEnrollment extends Document {
  enrollmentYear: string;
  qualificationId: string;
  qualification?: IQualification;
  firstYearEstimated: number;
  secondYearEstimated: number;
  thirdYearEstimated: number;
}
