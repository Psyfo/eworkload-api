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
