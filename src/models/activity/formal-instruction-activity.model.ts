import mongoose from 'mongoose';

import WorkloadController from '../../controllers/workload/workload.controller';
import Activity from './activity.model';

const formalInstructionActivitySchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      required: true,
      ref: 'Group'
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

// HOOKS
formalInstructionActivitySchema.post('save', async function() {
  const activity: any = await this;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});
formalInstructionActivitySchema.post('findOneAndUpdate', async function(doc) {
  const activity: any = doc;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});
formalInstructionActivitySchema.post('findOneAndRemove', async function(doc) {
  const activity: any = doc;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});

// VIRTUALS
formalInstructionActivitySchema.virtual('group', {
  ref: 'Group',
  localField: 'groupId',
  foreignField: '_id',
  justOne: true
});

const FormalInstructionActivity = Activity.discriminator('FormalInstructionActivity', formalInstructionActivitySchema);
export default FormalInstructionActivity;
