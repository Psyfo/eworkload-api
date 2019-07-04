import mongoose from 'mongoose';
import uuidv4 from 'uuid/v4';

const positionSchema = new mongoose.Schema(
  {
    positionId: {
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
    description: {
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

const Position = mongoose.model('Position', positionSchema);
export default Position;
