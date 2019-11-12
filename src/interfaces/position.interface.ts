import { Document } from 'mongoose';

export default interface IPosition extends Document {
  positionId: string;
  name: string;
  description: string;
}
