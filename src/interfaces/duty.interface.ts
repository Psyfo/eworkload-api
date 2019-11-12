import { Document } from 'mongoose';

export default interface IDuty extends Document {
  dutyId: string;
  name: string;
  description?: string;
}
