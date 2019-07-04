import mongoose from 'mongoose';
import uuidv4 from 'uuid/v4';
import Module from './module';

const moduleEnrollmentSchema = new mongoose.Schema(
  {
    enrollmentYear: {
      type: String,
    },
    moduleId: {
      type: String,
    },
    firstYearEstimated: {
      type: Number,
    },
    secondYearEstimated: {
      type: Number,
    },
    thirdYearEstimated: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

moduleEnrollmentSchema.index(
  { enrollmentYear: 1, moduleId: 1 },
  { unique: true }
);

moduleEnrollmentSchema.virtual('qualification', {
  ref: 'Module',
  localField: 'moduleId',
  foreignField: 'moduleId',
  justOne: true,
});

const Enrollment = mongoose.model('Module-Enrollment', moduleEnrollmentSchema);
export default Enrollment;
