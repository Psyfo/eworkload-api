import mongoose from 'mongoose';
import Discipline from './discipline';
import Module from './module';
import uuidv4 from 'uuid/v4';
import { type } from 'os';

const lectureStackSchema = new mongoose.Schema(
  {
    lectureStackId: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4
    },
    disciplineId: {
      type: String,
      required: true,
      ref: 'Discipline'
    },
    moduleIds: [String],
    groups: {
      type: Number
    },
    userIds: [String]
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

lectureStackSchema.virtual('discipline', {
  ref: 'Discipline',
  localField: 'disciplineId',
  foreignField: 'disciplineId',
  justOne: true
});

lectureStackSchema.virtual('module', {
  ref: 'Module',
  localField: 'modulesIds',
  foreignField: 'moduleId',
});

lectureStackSchema.virtual('user', {
  ref: 'User',
  localField: 'userIds',
  foreignField: 'userId',
});

const LectureStack = mongoose.model('LectureStack', lectureStackSchema);
export default LectureStack;
