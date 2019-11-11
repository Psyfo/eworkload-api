import mongoose from 'mongoose';

const workloadSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'User'
    },
    year: {
      type: String
    },
    workFocusName: {
      type: String,
      ref: 'WorkFocus'
    },
    teachingEstimated: {
      type: Number
    },
    teachingActual: {
      type: Number,
      default: 0
    },
    researchEstimated: {
      type: Number
    },
    researchActual: {
      type: Number,
      default: 0
    },
    serviceEstimated: {
      type: Number
    },
    serviceActual: {
      type: Number,
      default: 32
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

// INDEX
workloadSchema.index({ userId: 1, year: 1 }, { unique: true });

// VIRTUALS
workloadSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true
});
workloadSchema.virtual('work-focus', {
  ref: 'WorkFocus',
  localField: 'workFocusName',
  foreignField: 'workFocusName',
  justOne: true
});

const Workload = mongoose.model('Workload', workloadSchema);
export default Workload;
