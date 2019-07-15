import mongoose from 'mongoose';
import uuidv4 from 'uuid/v4';

const activitySchema = new mongoose.Schema(
  {
    activityId: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4
    },
    userId: {
      type: String,
      ref: 'User'
    },
    dutyId: {
      type: String,
      ref: 'Duty'
    },
    approvalStatus: {
      type: String,
      default: 'awaiting'
    },
    workload: {
      type: Number
    },
    other: {
      type: Number
    },
    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date
    }
  },
  {
    timestamps: true,
    discriminatorKey: 'activityType',
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

// Hooks

// Virtuals
activitySchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true
});
activitySchema.virtual('duty', {
  ref: 'Duty',
  localField: 'dutyId',
  foreignField: 'dutyId',
  justOne: true
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
