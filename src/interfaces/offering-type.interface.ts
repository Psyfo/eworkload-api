import { Document } from 'mongoose';

export default interface IOfferingType extends Document {
  offeringTypeId: string;
  description: string;
}
