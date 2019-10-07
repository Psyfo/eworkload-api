import mongoose from 'mongoose';

const formalInstructionWorkloadSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  formalInstructionWorkloads: [
    {
      activity: {
        type: mongoose.Schema.Types.Mixed
      },
      studentsEnrolled: {
        type: Number
      },
      baseContactHours: {
        type: Number
      },
      coordinationHours: {
        type: Number
      },
      studentSupportHours: {
        type: Number
      },
      preparationTimeHours: {
        type: Number
      },
      assessmentSettingsHours: {
        type: Number
      },
      examMarkingHours: {
        type: Number
      },
      courseworkMarkingHours: {
        type: Number
      },
      feedbackHours: {
        type: Number
      },
      formativeAssessmentHours: {
        type: Number
      },
      moderationHours: {
        type: Number
      },
      otherHoursPerActivity: {
        type: Number
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
