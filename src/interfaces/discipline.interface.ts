import { Document } from 'mongoose';

export default interface IDiscipline extends Document {
  disciplineId: string;
  name: string;
  description?: string;
}
