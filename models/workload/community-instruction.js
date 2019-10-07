import mongoose from 'mongoose';

const communityInstructionWorkloadSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  communityInstructionWorkloads: [
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
communityInstructionWorkloadSchema.virtual('community-instruction-activity', {
  ref: 'CommunityInstructionActivity',
  localField: 'activityId',
  foreignField: 'activityId',
  justOne: true
});

const CommunityInstructionWorkload = mongoose.model(
  'CommunityInstructionWorkload',
  communityInstructionWorkloadSchema
);
export default CommunityInstructionWorkload;
