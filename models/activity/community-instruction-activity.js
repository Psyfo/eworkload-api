import mongoose from 'mongoose';
import Activity from './activity';

const commInstructionActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  evidence: {
    type: String
  }
});

// Hooks

// Virtuals

const CommInstructionActivity = Activity.discriminator(
  'CommInstructionActivity',
  commInstructionActivitySchema
);
export default CommInstructionActivity;
