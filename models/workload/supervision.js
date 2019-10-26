import mongoose from 'mongoose';

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
