import mongoose from 'mongoose';

const academicAdministrationWorkloadSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  academicAdministrationWorkloads: [
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
academicAdministrationWorkloadSchema.virtual(
  'academic-administration-activity',
  {
    ref: 'AcademicAdministrationActivity',
    localField: 'activityId',
    foreignField: 'activityId',
    justOne: true
  }
);

const AcademicAdministrationWorkload = mongoose.model(
  'AcademicAdministrationWorkload',
  academicAdministrationWorkloadSchema
);
export default AcademicAdministrationWorkload;
