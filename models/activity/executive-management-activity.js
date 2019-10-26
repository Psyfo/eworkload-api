import mongoose from 'mongoose';
import Activity from './activity';
import * as WorkloadMethods from './../../controllers/workload';

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
  const activity = this;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});
executiveManagementActivitySchema.post('findOneAndUpdate', async function(doc) {
  const activity = doc;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});
executiveManagementActivitySchema.post('findOneAndRemove', async function(doc) {
  const activity = doc;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});

// VIRATUALS

const ExecutiveManagementActivity = Activity.discriminator(
  'ExecutiveManagementActivity',
  executiveManagementActivitySchema
);
export default ExecutiveManagementActivity;
