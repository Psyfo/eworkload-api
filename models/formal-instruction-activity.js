import mongoose from 'mongoose';
import Activity from './activity';

const formalInstructionActivitySchema = new mongoose.Schema(
  {
    moduleId: {
      type: String,
      required: true,
      ref: 'Module',
    },
    blockId: {
      type: String,
      ref: 'Block',
    },
    offeringTypeId: {
      type: String,
      ref: 'OfferingType',
    },
    qualificationId: {
      type: String,
      ref: 'Qualification',
    },
    baseContactHours: {
      type: Number,
    },
    coordinationHours: {
      type: Number,
    },
    studentSupportHours: {
      type: Number,
    },
    preparationTimeHours: {
      type: Number,
    },
    assessmentSettingHours: {
      type: Number,
    },
    examMarkingHours: {
      type: Number,
    },
    courseworkMarkingHours: {
      type: Number,
    },
    feedbackHours: {
      type: Number,
    },
    formativeAssessmentHours: {
      type: Number,
    },
    moderationHours: {
      type: Number,
    },
    otherHours: {
      type: Number,
    },
    totalHours: {
      type: Number,
    },
    teachingPercentage: {
      type: Number,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Indexes
formalInstructionActivitySchema.index(
  { moduleId: 1, blockId: 1, offeringTypeId: 1, qualificationId: 1 },
  { unique: true }
);

// Virtuals
formalInstructionActivitySchema.virtual('module', {
  ref: 'Module',
  localField: 'moduleId',
  foreignField: 'moduleId',
  justOne: true,
});
formalInstructionActivitySchema.virtual('offeringType', {
  ref: 'OfferingType',
  localField: 'offeringTypeId',
  foreignField: 'offeringTypeId',
  justOne: true,
});
formalInstructionActivitySchema.virtual('qualification', {
  ref: 'Qualification',
  localField: 'qualificationId',
  foreignField: 'qualificationId',
  justOne: true,
});
formalInstructionActivitySchema.virtual('block', {
  ref: 'Block',
  localField: 'blockId',
  foreignField: 'blockId',
  justOne: true,
});

const FormalInstructionActivity = Activity.discriminator(
  'FormalInstructionActivity',
  formalInstructionActivitySchema
);
export default FormalInstructionActivity;
