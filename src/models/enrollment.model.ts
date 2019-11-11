import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    enrollmentYear: {
      type: String
    },
    qualificationId: {
      type: String
    },
    firstYearEstimated: {
      type: Number
    },
    secondYearEstimated: {
      type: Number
    },
    thirdYearEstimated: {
      type: Number
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

enrollmentSchema.index(
  { enrollmentYear: 1, qualificationId: 1 },
  { unique: true }
);

enrollmentSchema.virtual('qualification', {
  ref: 'Qualification',
  localField: 'qualificationId',
  foreignField: 'qualificationId',
  justOne: true
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;
