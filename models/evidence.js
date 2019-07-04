import mongoose from 'mongoose';
import uuidv4 from 'uuid/v4';

const evidenceSchema = new mongoose.Schema(
  {
    evidenceId: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    item: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Evidence = mongoose.model('Evidence', evidenceSchema);
export default Evidence;
