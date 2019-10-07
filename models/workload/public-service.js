import mongoose from 'mongoose';

const publicServiceWorkloadSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  publicServiceWorkloads: [
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
publicServiceWorkloadSchema.virtual('public-service-activity', {
  ref: 'PublicServiceActivity',
  localField: 'activityId',
  foreignField: 'activityId',
  justOne: true
});

const PublicServiceWorkload = mongoose.model(
  'PublicServiceWorkload',
  publicServiceWorkloadSchema
);
export default PublicServiceWorkload;
