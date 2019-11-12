import { Document } from 'mongoose';

export default interface IWorkFocus extends Document {
  name: string;
  teachingRatio: number;
  researchRatio: number;
  serviceRatio: number;
}
