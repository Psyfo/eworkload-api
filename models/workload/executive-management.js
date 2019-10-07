import mongoose from 'mongoose';

const executiveManagementWorkloadSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  executiveManagementWorkloads: [
    {
      activity: {
        type: mongoose.Schema.Types.Mixed
      },
      totalHoursPerActivity: {
        type: Number
      },
      percentageOfWorkFocusPerActivity: {
        type: Number
      },
      percentageOfAnnualHoursPerActivity: {
        type: Number
      },
      percentageOfTotalHoursPerActivity: {
        type: Number
      }
    }
  ],
  globalTarrif: {
    type: Number
  },
  totalHoursPerUser: {
    type: Number
  },
  percentageOfWorkFocusPerUser: {
    type: Number
  },
  percentageOfAnnualHoursPerUser: {
    type: Number
  },
  percentageOfTotalHoursPerUser: {
    type: Number
  }
});

// Virtuals
executiveManagementWorkloadSchema.virtual('executive-management-activity', {
  ref: 'ExecutiveManagementActivity',
  localField: 'activityId',
  foreignField: 'activityId',
  justOne: true
});

const ExecutiveManagementWorkload = mongoose.model(
  'ExecutiveManagementWorkload',
  executiveManagementWorkloadSchema
);
export default ExecutiveManagementWorkload;
