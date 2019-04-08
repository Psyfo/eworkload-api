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
    description: {
      type: String,
      required: true,
      trim: true
    },
    nqfLevel: {
      type: Number,
      required: true
    },
    qualificationId: {
      type: String,
      required: true,
      trim: true,
      ref: 'Qualification'
    },
    offeringType: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'OfferingType'
    },
    disciplineId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'Discipline'
    },
    credits: {
      type: Number,
      required: true
    },
    isMajor: {
      type: Boolean
    },
    type: {
      type: String
    },
    baseContact: {
      type: Number
    },
    basePractical: {
      type: Number
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
