import mongoose from 'mongoose';
import Duty from './duty';
import Event from './event';

const tarrifSchema = new mongoose.Schema(
  {
    dutyId: {
      type: String,
      required: true,
      trim: true,
      ref: 'Duty'
    },
    eventId: {
      type: String,
      required: true,
      trim: true,
      ref: 'Event'
    },
    description: {
      type: String,
      trim: true
    },
    appliedTarrif: {
      type: String,
      trim: true
    },
    minHours: {
      type: Number,
      default: 0
    },
    maxHours: {
      type: Number,
      default: 0
    },
    explanation: {
      type: String,
      trim: true
    },
    TRS: {
      type: String,
      trim: true
    },
    evidenceRequired: {
      type: Boolean
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

// Virtuals
tarrifSchema.virtual('duty', {
  ref: 'Duty',
  localField: 'dutyId',
  foreignField: 'dutyId',
  justOne: true
});
tarrifSchema.virtual('event', {
  ref: 'Event',
  localField: 'eventId',
  foreignField: 'eventId',
  justOne: true
});

const Tarrif = mongoose.model('Tarrif', tarrifSchema);
export default Tarrif;
