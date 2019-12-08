import { Document } from 'mongoose';

import IQualification from './qualification.interface';

export default interface IEnrollment extends Document {
  id: string;
  enrollmentYear: string;
  qualificationId: string;
  qualification?: IQualification;
  firstYearEstimated: number;
  secondYearEstimated: number;
  thirdYearEstimated: number;
}
