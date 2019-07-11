import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    departmentId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    facultyId: {
      type: String,
      ref: 'Faculty'
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
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

// Hooks

// Virtuals
departmentSchema.virtual('faculty', {
  ref: 'Faculty',
  localField: 'facultyId',
  foreignField: 'facultyId',
  justOne: true
});

const Department = mongoose.model('Department', departmentSchema);
export default Department;
