import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      required: true,
      trim: true
    },
    moduleId: {
      type: String,
      ref: 'Module'
    },
    studentsEnrolled: {
      type: Number
    },
    modularity: {
      type: Number,
      default: 1
    },
    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date
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

// INDEXES
groupSchema.index({ moduleId: 1, groupId: 1 }, { unique: true });

// HOOKS

// VIRTUALS
groupSchema.virtual('module', {
  ref: 'Module',
  localField: 'moduleId',
  foreignField: '_id',
  justOne: true
});

const Group = mongoose.model('Group', groupSchema);
export default Group;
