import { Document } from 'mongoose';

export default interface IUpload extends Document {
  filename: string;
  mimetype: string;
  path: string;
}
