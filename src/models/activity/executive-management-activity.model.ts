import mongoose from 'mongoose';

import * as WorkloadMethods from '../../controllers/workload.controller';
import Activity from './activity.model';

const executiveManagementActivitySchema = new mongoose.Schema({
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
executiveManagementActivitySchema.post('save', async function() {
  const activity: any = this;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});
executiveManagementActivitySchema.post('findOneAndUpdate', async function(doc) {
  const activity: any = doc;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});
executiveManagementActivitySchema.post('findOneAndRemove', async function(doc) {
  const activity: any = doc;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});

// VIRATUALS

const ExecutiveManagementActivity = Activity.discriminator(
  'ExecutiveManagementActivity',
  executiveManagementActivitySchema
);
export default ExecutiveManagementActivity;
