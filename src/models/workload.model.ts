import { model, Schema } from 'mongoose';

const workloadSchema = new Schema(
  {
    userId: {
      type: String,
      ref: 'User'
    },
    year: {
      type: String,
      default: new Date().getFullYear()
    },
    workFocusName: {
      type: String,
      ref: 'WorkFocus'
    },
    academicAdministrationWorkload: {
      type: Schema.Types.Mixed
    },
    communityInstructionWorkload: {
      type: Schema.Types.Mixed
    },
    executiveManagementWorkload: {
      type: Schema.Types.Mixed
    },
    formalInstructionWorkload: {
      type: Schema.Types.Mixed
    },
    personnelDevelopmentWorkload: {
      type: Schema.Types.Mixed
    },
    publicServiceWorkload: {
      type: Schema.Types.Mixed
    },
    researchWorkload: {
      type: Schema.Types.Mixed
    },
    supervisionWorkload: {
      type: Schema.Types.Mixed
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

const Workload = model('Workload', workloadSchema);
export default Workload;
