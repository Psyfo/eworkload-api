import { Document } from 'mongoose';

export default interface IEvidence extends Document {
  activityId: string;
  location: string;
}
