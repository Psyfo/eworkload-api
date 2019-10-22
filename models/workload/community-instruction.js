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
