import mongoose from 'mongoose';
import Activity from './activity';
import * as WorkloadMethods from './../../controllers/workload';

const supervisionActivitySchema = new mongoose.Schema({
  supervisionRole: {
    type: String,
    required: true,
    trim: true
  },
  split: {
    type: Number
  },
  studentId: {
    type: String,
    ref: 'Student'
  },
  year: {
    type: String
  }
});

// INDEX
supervisionActivitySchema.index(
  { studentId: 1, userId: 1, year: 1 },
  { unique: true }
);

// HOOKS
supervisionActivitySchema.post('save', async function() {
  const activity = this;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});
supervisionActivitySchema.post('findOneAndUpdate', async function(doc) {
  const activity = doc;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});
supervisionActivitySchema.post('findOneAndRemove', async function(doc) {
  const activity = doc;
  await WorkloadMethods.calculateTotalWorkload(activity.userId);
});

// VIRTUALS
supervisionActivitySchema.virtual('student', {
  ref: 'Student',
  localField: 'studentId',
  foreignField: 'studentId',
  justOne: true
});

const SupervisionActivity = Activity.discriminator(
  'SupervisionActivity',
  supervisionActivitySchema
);
export default SupervisionActivity;
