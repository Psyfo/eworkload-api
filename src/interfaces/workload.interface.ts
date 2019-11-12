import { Document } from 'mongoose';

export default interface IWorkload extends Document {
  userId: string;
  year: string;
  workFocusName: string;
  teachingEstimated: number;
  teachingActual: number;
  researchEstimated: number;
  researchActual: number;
  serviceEstimated: number;
  serviceActual: number;
}
