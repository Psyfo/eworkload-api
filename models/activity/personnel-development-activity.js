import mongoose from 'mongoose';
import Activity from './activity';
import * as WorkloadMethods from './../../controllers/workload';

const personnelDevelopmentActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: [
    {
      type: String
    }
  ],
  duration: {
    type: String
  },
  evidence: {
    type: String
  }
});

// VIRTUALS

// HOOKS
personnelDevelopmentActivitySchema.post('save', async function() {
  const activity = this;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});
personnelDevelopmentActivitySchema.post('findOneAndUpdate', async function(
  doc
) {
  const activity = doc;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});
personnelDevelopmentActivitySchema.post('findOneAndRemove', async function(
  doc
) {
  const activity = doc;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});

const PersonnelDevelopmentActivity = Activity.discriminator(
  'PersonnelDevelopmentActivity',
  personnelDevelopmentActivitySchema
);
export default PersonnelDevelopmentActivity;
