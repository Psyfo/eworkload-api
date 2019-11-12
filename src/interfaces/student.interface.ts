import { Document } from 'mongoose';

export default interface IStudent extends Document {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  title: string;
  graduationDate: string;
}
