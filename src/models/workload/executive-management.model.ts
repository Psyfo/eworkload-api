import mongoose from 'mongoose';
import { logger } from './../../config/logger';
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

// HOOKS
executiveManagementWorkloadSchema.post('save', async function(doc: any) {
  logger.info('Executive Management Workload created');
});

// INDEX
executiveManagementWorkloadSchema.index({ userId: 1 }, { unique: true });

// VIRTUALS
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
