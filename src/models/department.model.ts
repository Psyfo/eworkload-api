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
    hodId: {
      type: String,
      ref: 'User'
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
departmentSchema.virtual('hod', {
  ref: 'User',
  localField: 'hodId',
  foreignField: 'userId',
  justOne: true
});

const Department = mongoose.model('Department', departmentSchema);
export default Department;
