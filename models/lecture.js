import mongoose from 'mongoose';
import Module from './module';
import uuidv4 from 'uuid/v4';

const lectureSchema = new mongoose.Schema(
  {
    moduleId: {
      type: String,
      ref: 'Module'
    },
    venueId: {
      type: String,
      ref: 'Venue'
    },
    disciplineId: {
      type: String,
      ref: 'Discipline'
    },
    blockId: {
      type: String,
      ref: 'Block'
    },
    userIds: {
      type: [String]
    },
    userIds2: [{ type: String, ref: 'User' }],
    stackId: {
      type: String
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

lectureSchema.virtual('discipline', {
  ref: 'Discipline',
  localField: 'disciplineId',
  foreignField: 'disciplineId',
  justOne: true
});

lectureSchema.virtual('venue', {
  ref: 'Venue',
  localField: 'venueId',
  foreignField: 'venueId',
  justOne: true
});

lectureSchema.virtual('module', {
  ref: 'Module',
  localField: 'moduleId',
  foreignField: 'moduleId',
  justOne: true
});

lectureSchema.virtual('users', {
  ref: 'User',
  localField: 'userIds',
  foreignField: 'userId'
});
lectureSchema.virtual('users2', {
  ref: 'User',
  localField: 'userIds2',
  foreignField: 'userId'
});

const Lecture = mongoose.model('Lecture', lectureSchema);
export default Lecture;
