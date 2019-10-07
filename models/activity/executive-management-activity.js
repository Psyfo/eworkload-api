import mongoose from 'mongoose';
import Activity from './activity';

const executiveManagementActivitySchema = new mongoose.Schema({
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

const ExecutiveManagementActivity = Activity.discriminator(
  'ExecutiveManagementActivity',
  executiveManagementActivitySchema
);
export default ExecutiveManagementActivity;
