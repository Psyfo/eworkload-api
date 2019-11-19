import mongoose from 'mongoose';

import { logger } from '../../config/logger';

const supervisionWorkloadSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  supervisionWorkloads: [
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
supervisionWorkloadSchema.post('save', async function(doc: any) {
  logger.info('Supervision Workload created');
});

// INDEX
supervisionWorkloadSchema.index({ userId: 1 }, { unique: true });

// VIRTUALS
supervisionWorkloadSchema.virtual('supervision-activity', {
  ref: 'SupervisionActivity',
  localField: 'activityId',
  foreignField: 'activityId',
  justOne: true
});

const SupervisionWorkload = mongoose.model(
  'SupervisionWorkload',
  supervisionWorkloadSchema
);
export default SupervisionWorkload;
