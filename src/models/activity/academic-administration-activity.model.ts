import mongoose from 'mongoose';
import Activity from './activity.model';
import WorkloadController from '../../controllers/workload/workload.controller';

const academicAdministrationActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  qualificationId: {
    type: String
  },
  description: {
    type: String,
    trim: true
  },
  evidence: {
    type: String
  }
});

// HOOKS
academicAdministrationActivitySchema.post('save', async function() {
  const activity: any = await this;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});
academicAdministrationActivitySchema.post('findOneAndUpdate', async function(
  doc
) {
  const activity: any = await doc;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});
academicAdministrationActivitySchema.post('findOneAndRemove', async function(
  doc
) {
  const activity: any = await doc;
  await WorkloadController.calculateTotalWorkload(activity.userId);
});

// VIRTUALS
academicAdministrationActivitySchema.virtual('qualification', {
  ref: 'Qualification',
  localField: 'qualificationId',
  foreignField: 'qualificationId',
  justOne: true
});

const AcademicAdministrationActivity = Activity.discriminator(
  'AcademicAdministrationActivity',
  academicAdministrationActivitySchema
);
export default AcademicAdministrationActivity;
