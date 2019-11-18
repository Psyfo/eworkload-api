import mongoose from 'mongoose';

import WorkloadController from '../../controllers/workload/workload.controller';
import Activity from './activity.model';

const publicServiceActivitySchema = new mongoose.Schema({
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
publicServiceActivitySchema.post('save', async function() {
  const activity: any = this;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});
publicServiceActivitySchema.post('findOneAndUpdate', async function(doc) {
  const activity: any = doc;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});
publicServiceActivitySchema.post('findOneAndRemove', async function(doc) {
  const activity: any = doc;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});

// VIRTUALS

const PublicServiceActivity = Activity.discriminator(
  'PublicServiceActivity',
  publicServiceActivitySchema
);
export default PublicServiceActivity;
