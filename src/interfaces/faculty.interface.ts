import { Document } from 'mongoose';

export default interface IFaculty extends Document {
  facultyId: string;
  name: string;
}
