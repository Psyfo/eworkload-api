import mongoose from 'mongoose';
import Activity from './activity.model';
import * as WorkloadMethods from '../../controllers/workload.controller';

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
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});
publicServiceActivitySchema.post('findOneAndUpdate', async function(doc) {
  const activity: any = doc;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});
publicServiceActivitySchema.post('findOneAndRemove', async function(doc) {
  const activity: any = doc;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});

// VIRTUALS

const PublicServiceActivity = Activity.discriminator(
  'PublicServiceActivity',
  publicServiceActivitySchema
);
export default PublicServiceActivity;
