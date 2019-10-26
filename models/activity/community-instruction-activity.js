import mongoose from 'mongoose';
import Activity from './activity';
import * as WorkloadMethods from './../../controllers/workload';

const communityInstructionActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  evidence: {
    type: String
  }
});

// HOOKS
communityInstructionActivitySchema.post('save', async function() {
  const activity = this;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});
communityInstructionActivitySchema.post('findOneAndUpdate', async function(
  doc
) {
  const activity = doc;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});
communityInstructionActivitySchema.post('findOneAndRemove', async function(
  doc
) {
  const activity = doc;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});

// VIRTUALS

const CommInstructionActivity = Activity.discriminator(
  'CommInstructionActivity',
  communityInstructionActivitySchema
);
export default CommInstructionActivity;
