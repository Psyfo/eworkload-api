import mongoose from 'mongoose';

const personnelDevelopmentWorkloadSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  personnelDevelopmentWorkloads: [
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

// VIRTUALS
personnelDevelopmentWorkloadSchema.virtual('personnel-development-activity', {
  ref: 'PersonnelDevelopmentActivity',
  localField: 'activityId',
  foreignField: 'activityId',
  justOne: true
});

const PersonnelDevelopmentWorkload = mongoose.model(
  'PersonnelDevelopmentWorkload',
  personnelDevelopmentWorkloadSchema
);
export default PersonnelDevelopmentWorkload;
