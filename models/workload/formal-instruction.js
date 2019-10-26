import mongoose from 'mongoose';

const formalInstructionWorkloadSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  formalInstructionWorkloads: [
    {
      activity: {
        type: mongoose.Schema.Types
      },
      module: {
        type: mongoose.Schema.Types
      },
      block: {
        type: mongoose.Schema.Types
      },
      offeringType: {
        type: mongoose.Schema.Types
      },
      qualification: {
        type: mongoose.Schema.Types
      },
      studentsEnrolled: {
        type: Number,
        default: 0
      },
      baseContactHours: {
        type: Number,
        default: 0
      },
      coordinationHours: {
        type: Number,
        default: 0
      },
      studentSupportHours: {
        type: Number,
        default: 0
      },
      preparationTimeHours: {
        type: Number,
        default: 0
      },
      assessmentSettingsHours: {
        type: Number,
        default: 0
      },
      examMarkingHours: {
        type: Number,
        default: 0
      },
      courseworkMarkingHours: {
        type: Number,
        default: 0
      },
      feedbackHours: {
        type: Number,
        default: 0
      },
      formativeAssessmentHours: {
        type: Number,
        default: 0
      },
      moderationHours: {
        type: Number,
        default: 0
      },
      otherHoursPerActivity: {
        type: Number,
        default: 0
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
formalInstructionWorkloadSchema.virtual('formal-instruction-activity', {
  ref: 'FormalInstructionActivity',
  localField: 'activityId',
  foreignField: 'activityId',
  justOne: true
});

const FormalInstructionWorkload = mongoose.model(
  'FormalInstructionWorkload',
  formalInstructionWorkloadSchema
);
export default FormalInstructionWorkload;
