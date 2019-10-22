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
        type: Number,
        default: 0
      },
      percentageOfWorkFocusPerActivity: {
        type: Number,
        default: 0
      },
      percentageOfAnnualHoursPerActivity: {
        type: Number,
        default: 0
      },
      percentageOfTotalHoursPerActivity: {
        type: Number,
        default: 0
      }
    }
  ],
  globalTarrif: {
    type: Number,
    default: 0
  },
  totalHoursPerUser: {
    type: Number,
    default: 0
  },
  percentageOfWorkFocusPerUser: {
    type: Number,
    default: 0
  },
  percentageOfAnnualHoursPerUser: {
    type: Number,
    default: 0
  },
  percentageOfTotalHoursPerUser: {
    type: Number,
    default: 0
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
