import mongoose from 'mongoose';

import * as WorkloadMethods from '../../controllers/workload.controller';
import Activity from './activity.model';
import IFormalInstructionActivity from 'interfaces/activity/formal-instruction-activity.interface';

const formalInstructionActivitySchema = new mongoose.Schema(
  {
    moduleId: {
      type: String,
      required: true,
      ref: 'Module'
    },
    blockId: {
      type: String,
      ref: 'Block'
    },
    offeringTypeId: {
      type: String,
      ref: 'OfferingType'
    },
    qualificationId: {
      type: String,
      ref: 'Qualification'
    },
    isCoordinator: {
      type: Boolean
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
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

// INDEX
formalInstructionActivitySchema.index(
  { userId: 1, moduleId: 1, blockId: 1, offeringTypeId: 1, qualificationId: 1 },
  { unique: true }
);

// HOOKS
formalInstructionActivitySchema.post('save', async function() {
  const activity: any = this;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});
formalInstructionActivitySchema.post('findOneAndUpdate', async function(
  doc: IFormalInstructionActivity
) {
  const activity: IFormalInstructionActivity = doc;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});
formalInstructionActivitySchema.post('findOneAndRemove', async function(
  doc: IFormalInstructionActivity
) {
  console.log('Doc', doc);

  const activity: IFormalInstructionActivity = doc;
  console.log('Activity', activity);

  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});

// VIRTUALS
formalInstructionActivitySchema.virtual('module', {
  ref: 'Module',
  localField: 'moduleId',
  foreignField: 'moduleId',
  justOne: true
});
formalInstructionActivitySchema.virtual('offeringType', {
  ref: 'OfferingType',
  localField: 'offeringTypeId',
  foreignField: 'offeringTypeId',
  justOne: true
});
formalInstructionActivitySchema.virtual('qualification', {
  ref: 'Qualification',
  localField: 'qualificationId',
  foreignField: 'qualificationId',
  justOne: true
});
formalInstructionActivitySchema.virtual('block', {
  ref: 'Block',
  localField: 'blockId',
  foreignField: 'blockId',
  justOne: true
});

const FormalInstructionActivity = Activity.discriminator(
  'FormalInstructionActivity',
  formalInstructionActivitySchema
);
export default FormalInstructionActivity;
