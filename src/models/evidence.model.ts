import mongoose from 'mongoose';

const evidenceSchema = new mongoose.Schema(
  {
    activityId: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String
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
