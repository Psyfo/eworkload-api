import mongoose from 'mongoose';

const researchWorkloadSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  researchWorkloads: [
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
researchWorkloadSchema.virtual('research-activity', {
  ref: 'ResearchActivity',
  localField: 'activityId',
  foreignField: 'activityId',
  justOne: true
});

const ResearchWorkload = mongoose.model(
  'ResearchWorkload',
  researchWorkloadSchema
);
export default ResearchWorkload;
