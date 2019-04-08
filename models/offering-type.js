import mongoose from 'mongoose';
import uuidv4 from 'uuid/v4';

const offeringTypeSchema = new mongoose.Schema(
  {
    offeringTypeId: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const OfferingType = mongoose.model('OfferingType', offeringTypeSchema);
export default OfferingType;
