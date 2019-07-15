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
  }
});

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
