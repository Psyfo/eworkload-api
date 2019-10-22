import mongoose from 'mongoose';
import Activity from './activity';

const supervisionActivitySchema = new mongoose.Schema({
  supervisionRole: {
    type: String,
    required: true,
    trim: true
  },
  split: {
    type: Number
  },
  studentId: {
    type: String,
    ref: 'Student'
  },
  year: {
    type: String
  }
});

// Index
supervisionActivitySchema.index(
  { studentId: 1, userId: 1, year: 1 },
  { unique: true }
);
// Virtuals
supervisionActivitySchema.virtual('student', {
  ref: 'Student',
  localField: 'studentId',
  foreignField: 'studentId',
  justOne: true
});

const SupervisionActivity = Activity.discriminator(
  'SupervisionActivity',
  supervisionActivitySchema
);
export default SupervisionActivity;
