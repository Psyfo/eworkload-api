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
