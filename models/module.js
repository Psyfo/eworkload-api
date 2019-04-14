import mongoose from 'mongoose';
import Qualification from './qualification';
import OfferingType from './offering-type';
import Discipline from './discipline';

const moduleSchema = new mongoose.Schema(
  {
    moduleId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    assessmentMethod: {
        type: String,
        required: true,
        trim: true
    },
    nqfLevel: {
      type: Number,
      required: true
    },
    prerequisites: {
        type: [String],
        ref: 'Module'
    },
    qualificationId: {
      type: String,
      required: true,
      trim: true,
      ref: 'Qualification'
    },
    offeringTypeId: {
      type: String,
      required: true,
      trim: true,
      ref: 'OfferingType'
    },
    disciplineId: {
      type: String,
      required: true,
      trim: true,
      ref: 'Discipline'
    },
    credits: {
      type: Number,
      required: true
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
moduleSchema.virtual('discipline', {
  ref: 'Discipline',
  localField: 'disciplineId',
  foreignField: 'disciplineId',
  justOne: true
});
moduleSchema.virtual('offering-type', {
  ref: 'OfferingType',
  localField: 'offeringTypeId',
  foreignField: 'offeringTypeId',
  justOne: true
});
moduleSchema.virtual('qualification', {
  ref: 'Qualification',
  localField: 'qualificationId',
  foreignField: 'qualificationId',
  justOne: true
});

const Module = mongoose.model('Module', moduleSchema);
export default Module;
