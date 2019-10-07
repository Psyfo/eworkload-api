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
